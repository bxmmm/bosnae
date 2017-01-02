var express = require('express'),
    Article = require('../models/article'),
     router = express.Router();
 var middle = require('../middleware/index')

// Show all articles
router.get('/', function(req, res){
    // find articles in DB
    Article.find({}, function(err, foundArticles){
        if (err) {
            console.log(err)
     // render show template with them
        } else {
            res.render('./articles/index', {articles: foundArticles.reverse()})
        }
    })
});
// Show form to create new article
router.get('/new', middle.isLoggedIn, function(req, res){
    res.render('./articles/new')
});
// POST new article
router.post('/', middle.isLoggedIn, function(req, res){
    Article.create(req.body.article, function(err, createdArticle){
        if(err) {
            console.log(err);
            res.redirect('/articles')
        } else {
            res.redirect('/articles')
        }
    })
})
// Show article page
router.get('/:id', function(req, res){
    // Find article by id
    Article.findById(req.params.id, function(err, foundArticle){
        if (err) {
            console.log(err)
            res.redirect('/articles')
        } else {
     // Render show page
            res.render('./articles/show', {article: foundArticle})
        }
    })
})
// Show edit page (form)
router.get('/:id/edit', middle.isLoggedIn, function(req, res){
    // Get data from DB and put it in form
    Article.findById(req.params.id, function(err, foundArticle){
        if(err) {
            console.log(err)
            res.redirect('/articles')
        } else {
            res.render('./articles/edit', {article: foundArticle})
        }
    })
})
// PUT REQUEST
router.put('/:id', middle.isLoggedIn, function(req, res){
    Article.findByIdAndUpdate(req.params.id, req.body.article, function(err, updatedArticle){
        if(err) {
            console.log(err)
            res.redirect('/articles')
        } else {
            res.redirect('/articles/'+ req.params.id)
        }
    })
})
// Delete route
router.delete('/:id', middle.isLoggedIn , function(req, res){
    Article.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err)
            res.redirect('/articles')
        } else {
            res.redirect('/articles')
        }
    })
})


module.exports = router;