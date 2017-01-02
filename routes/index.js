var express = require('express'),
     router = express.Router(),
   passport = require('passport'),
       User = require('../models/user'),
     middle = require('../middleware/index'),
       Link = require('../models/link');

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

// Show route za galeriju
router.get("/galerija", function(req, res){
    // Nadji sve linkove iz baze
     Link.find({}, function(err, links){
         if(err) {
             console.log(err)
         } else {
             res.render('galerija', {links: links})
         }
     })
});
// Create route za formu + post
router.get('/galerija/new',middle.isLoggedIn, function(req, res){
    res.render('links/new')
})
router.post('/galerija',middle.isLoggedIn, function(req, res){
    Link.create(req.body.link, function(err, createdLink){
        if(err) {
            console.log(err)
        } else {
            res.redirect('/galerija')
        }
    })
})
router.get('/galerija/delete',middle.isLoggedIn, function(req, res){
    Link.find({}, function(err, foundLink){
        if(err) {
            console.log(err)
        } else {
            res.render('links/show', {links: foundLink})
        }
    })
})
// Delete route za slike seminari
router.delete('/galerija/:id',middle.isLoggedIn, function(req, res){
    Link.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            console.log(err)
        } else {
            res.redirect('back')
        }
    })
})
// Other routes
router.get("/lokacija", function(req, res){
    res.render("lokacija");
});
router.get("/instruktori", function(req, res){
    res.render("instruktori");
});
router.get("/kontakt", function(req, res){
    res.render("kontakt");
});
router.get("/raspored", function(req, res){
    res.render("raspored");
});
// // Register ROUTES --------------------------------------------------------------------------------
// router.get('/register', function(req, res){
//     res.render('register')
// })
// router.post('/register', function(req, res){
//     User.register(new User(req.body.user), req.body.password, function(err, user){
//         if(err) {
//             console.log(err)
//         } else {
//             req.login(user, function(err){
//                 if(err) {
//                     console.log(err)
//                 } else {
//                     res.redirect('/raspored')
//                 }
//             })
//         }
//     })
// })

// LOGIN ZA SAJT
// Login routes
router.get('/login', function(req, res){
    res.render('login')
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/articles',
    failureRedirect: '/login'
}), function(req, res){
})
// Logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/')
})
router.get('*', function(req, res){
    res.send('ERROR')
})
module.exports = router;