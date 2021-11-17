const express = require('express')
const router = express.Router()
const bookModel = require('../models/bookModel')

//create, find, update, delete
router.get('/index', (req, res) => {
    bookModel.getAllBooks()
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('query error')
    })
})

router.get('/books/:id', (req, res) => {
    bookModel.getBookById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to get book by id")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json('failed to get book - query error')
        })
})

router.post('/books/add-book', (req, res) => {
    // thre req.body represents the posted json data
    let book = req.body

    // Each of the names below reference the "name" attribute in the form
    bookModel.addBook(
        book.bookTitle,
        book.originalTitle,
        book.yearofPublication,
        book.genre,
        book.millionsSold,
        book.languageWritten,
        book.coverImagePath,
        book.authorID
    )
    .then((result) => {
        if (result.affectedRows > 0) {
            res.status(200).json('book updated')
        } else {
            res.status(404).json('book not found')
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('failed to update book - query error')
    })
})


router.post('/books/update', (req, res) => {
    // thre req.body represents the posted json data
    let book = req.body

    // Each of the names below reference the "name" attribute in the form
    bookModel.updateBook(
        book.bookID,
        book.bookTitle,
        book.originalTitle,
        book.yearofPublication,
        book.genre,
        book.millionsSold,
        book.languageWritten,
        book.coverImagePath,
        book.authorID
    )
    .then((result) => {
        if (result.affectedRows > 0) {
            res.status(200).json('book updated')
        } else {
            res.status(404).json('book not found')
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('failed to update book - query error')
    })
})

router.post('/books/delete', (req, res) => {
    // Access the book id from the body of the request
    let bookID = req.body.bookID

    // ask the model to delete the book with bookID
    bookModel.deleteBook(bookID)
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json(result[0])
            } 
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json('failed to delete book - query error')
        })
})


router.post("/books/delete", (req, res) => {
    // Access the book id from the body of the request
    let bookID = req.body.bookID

    // Ask the model to delete the book with bookId
    bookModel.deleteBook(bookID)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("book deleted")
            } else {
                res.status(404).json("book not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to delete book - query error")
        })
})

module.exports = router