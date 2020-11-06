const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        title: String,
        content: String,
        date: {
            type: Date, default: Date.now
        }
    },
);



const Book = mongoose.model('book', bookSchema);
const dataSchema = new Schema({ }, { collection: 'COLLECTION_NAME'});

module.exports = mongoose.model("book", bookSchema );