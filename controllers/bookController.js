const mongoose = require("mongoose");
const Book = require("../models/book");
const createBook = async (req,res) => {
    try {
        const {title, author, year, genre} = req.body;

        const newBook = new Book({
            title,
            author,
            year,
            genre
        });
    
  await newBook.save();

        res.status(201).json(newBook);
    } catch (err) {
        if (err.name === "validationError") {
            return res.status(400).json ({
                error: err.message
            });
        }

        res.status(500).json({
            error: "Error ao criar livro"
        });
    }
};

const getBooks = async (req,res) => {
    try {
        const books = await Book.find();
    
    return res.status(200).json(books);
    } catch (err) {
        console.error("Errro ao listar livros:",err);

        return res.status(500).json({
            error:"Erro ao listar livros"
        });
    }
};

const getBookById = async (req,res) =>{
    try {
        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "ID do livro inválido"
            });
        }
    
        const book = await Book.findById(id);

        if(!book) {
            return res.status(404).json({
                error: "Livro não encontrado"
            });
        }
    
        return res.status(200).json(book);
    } catch (err) {
        console.error("Error ao buscar llivro:", err);

        return res.status(500).json({
            error: "Error ao buscar livro"
        });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBookById
};