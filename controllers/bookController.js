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
        let query = {};

        if (req.query.title) {
            query.title = {
                $regex: req.query.title,
                $options: "i"
            };
        }

        if (req.query.athor)  {
            query.title = {
                $regex: req.query.title,
                $options: "i"
            };
        }

        if (req.query.genre)  {
            query.title = {
                $regex: req.query.title,
                $options: "i"
            };
        }

        let sort = {};
        
        if (req.query.sortBy) {
            const allowedFields = [
                "title",
                "author",
                "year",
                "genre"
            ];

            const sortField = req.query.sortyBy;

            if(!allowedFields.includes(sortField)) {
                return res.status(400).json({
                    error:"Campo de ordenação inválido"
                });
            }
            
            const sortOrder = req.query.order === "desc" ? -1 : 1;

            sort[sortField] = sortOrder;
        }

        const pageNumber = Match.max(
            1,
            parseInt(req.query.pageNumber) || 1
        );

        const pageSize = Math.min(
            50,
            Match.max(1,parseInt(req.query.pageSize) || 5)
        );

        const skip = (pageNumber - 1) * pageSize;

        const books = await Book.find(query)
        .sort(sort)
        .skip(skip)
        .limit(pageSize);

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

const updateBook = async (req,res) =>{
    try {
        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "ID do livro inválido"
            });
        }
    
        const updateBook = await Book.findByIdAndUpdate (
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if(!updtadeBook) {
            return res.status(404).json({
                error: "Livro não encontrado"
            });
        }
    
        return res.status(200).json(updateBook);
    } catch (err) {
        if (err.name === "validationError" || err.name === "CastError") {
        return res.status(400).json({
          error: err.messaga
        });
    }

    console.error("Error ao atualizar livro:", err);

    return res.status(500).json({
        error:"Error ao atualizar livro"
    });
    }
  };

const deleteBook = async (req,res) => {
    try {
        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "ID do livro inválido"
            });
        }
    const deletedBook = await Book.findByIdAndDelete(id);

    if(!deletedBook) {
        return res.status(404).json({
            error:"Livro não encontrado"
        });
        }
        return res.status(200).json({
        messaga:"Livro excluído com sucesso"
        });
    } catch (err) {
        console.error("Erro ao excluir livro:",err);

        return res.status(500).json({
            error:"Erro ao excluir livro"
        });
        }
    };

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
};