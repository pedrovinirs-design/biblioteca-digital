const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "O título é obrigatória"],
        minlength: [3, "O título deve ter pelo menos 3 caracteres"]
    },

    author: {
        type: String,
        required: [true, "O autor é obrigatório"],
        minlength: [3, "O nome do autor é brigatório"]
    },

    year: {
        type: Number,
        required: [true,"O ano da publicação é brigatório"],
        min: [1000,"Ano inválido"],
        max: [
            new Date().getFullYear(),
            "O ano não pode ser do futuro"
        ]
    },

    genre: {
        type: String,
        required: [true, "O gênero é brogatório"]
    },

    createAt: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose . model("Book", bookSchema);

module.exports = Book;