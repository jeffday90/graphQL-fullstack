const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorID: String,
});

// make a collection called Book, which uses the Book schema
module.exports = mongoose.model('Book', bookSchema)