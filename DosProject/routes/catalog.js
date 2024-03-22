const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

//GET all books
router.get("/books", async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//GET search about specific book (By ID)
router.get("/searchByID/:bookID", async (req, res) => {
    const bookID = req.params.bookID;

    try {
        const book = await Book.findByPk(bookID);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        console.error("Error searching for book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//GET search about specific book (By category)
router.get("/searchByCategory/:category", async (req, res) => {
    const category = req.params.category;
    try {
        const books = await Book.findAll({
            where: {
                category: category
            }
        });

        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: "No books found in the given category" });
        }
    } catch (error) {
        console.error("Error searching for books by category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//GET Number of stock for specific book
router.get("/stockNumber/:bookID", async (req, res) => {
    const bookID = req.params.bookID;

    try {
        const book = await Book.findByPk(bookID);
        if (book) {
            res.json({ stock: book.stock });
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        console.error("Error fetching stock number:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//PATCH update the number of book (stock) by bookID
router.patch("/update/stock/:bookID", async (req, res) => {
    const { stock } = req.body;
    const bookID = req.params.bookID;


    try {
        const updatedRows = await Book.update(
            { stock: stock },
            { where: { bookID: bookID } }
        );

        if (updatedRows > 0) {
            res.status(200).json({ message: "Stock updated successfully" });
        } else {
            res.status(404).json({ error: "Book not found or stock not updated" });
        }
    } catch (error) {
        console.error("Error updating stock:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;
