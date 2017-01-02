var 					express = require('express'),
					  	   path = require('path'),
  			  	  favicon = require('serve-favicon'),
 			    	   logger = require('morgan'),
				 cookieParser = require('cookie-parser'),
					 bodyParser = require('body-parser'),
			 methodOverride = require('method-override'),
						 mongoose = require('mongoose'),
   		       passport = require('passport'),
     		LocalStrategy = require('passport-local'),
passportLocalMongoose = require('passport-local-mongoose'),
       expressSession = require('express-session');

// REQUIRE RUTA
var articleRoutes = require('./routes/article'),
      indexRoutes = require('./routes/index');

// REQUIRE DB MODELA
var User = require('./models/user'),
		Link = require('./models/link'),
 Article = require('./models/article');

// express
var app = express();


// DB CONNECT PROMIJENITI U ENV VARIJABLU KASNIJE
mongoose.connect('mongodb://benjo:123@ds141118.mlab.com:41118/bosnae');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Passport setup
app.use(expressSession({
    secret: 'whatever random words for encryption ninja warrior',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
// Info about user on everypage
app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})

// USE ZA ROUTE
app.use('/articles', articleRoutes)
app.use(indexRoutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
