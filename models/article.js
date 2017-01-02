var mongoose = require('mongoose')

// Model Schema
var articleSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});
// Exporting model
module.exports = mongoose.model('Article', articleSchema)