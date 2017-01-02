var mongoose = require('mongoose');

var linkSchema = new mongoose.Schema({
    url: String
});

module.exports = mongoose.model('Link', linkSchema);