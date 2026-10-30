const express = require ("express")
const router = express.Router();
const validateTitle = require("../middlewares/validateTItle");
const bookController = require("../controllers/bookController");

router.post(
    "/books",
    validateTitle,
    bookController.createBook
);

router.get(
    "/books",
    bookController.getBooks
);

router.get(
    "/books/:id",
    bookController.getBookById
);

router.patch(
    "/books/:id",
    bookController.updateBokk
);

router.delete(
    "/books/:id",
    bookController.deleteBook
);

module.exports = router;