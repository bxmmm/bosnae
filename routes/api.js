var express = require('express'),
    Article = require('../models/article'),
     router = express.Router();
 var middle = require('../middleware/index');

router.get('/articles', function(req, res){
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