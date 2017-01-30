var express = require('express'),
    Article = require('../models/article'),
     router = express.Router();
 var middle = require('../middleware/index');


// origin za api request 
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/articles', function(req, res, next){
    // find articles in DB
    Article.find({}, function(err, foundArticles){
        if (err) {
            console.log(err)
     // render show template with them
        } else {
            res.json({articles: foundArticles.reverse()})
        }
    })
});

module.exports = router;