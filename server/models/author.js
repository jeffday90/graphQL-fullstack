const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number,
});

// make a collection called Author, which uses the author schema
module.exports = mongoose.model('Author', authorSchema);