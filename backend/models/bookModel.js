const db = require('../database')

module.exports.getAllBooks = () => {
    return db.query('SELECT bookID, bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID from book')
}

module.exports.getBookById = (id) => {
    return db.query('SELECT * from book WHERE bookID = ?', [id])
}


module.exports.addBook = (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) => {
    return db.query('INSERT INTO book (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID)' + `VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID])
}

module.exports.deleteBook = (bookID) => {
    return db.query('DELETE FROM book WHERE bookID =?', [bookID])
}

module.exports.updateBook = (bookID, bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) => {
    return db.query('UPDATE book SET bookTitle = ?, originalTitle = ?, yearofPublication = ?, genre = ?, millionsSold = ?, languageWritten = ?, coverImagePath = ?, authorID = ? WHERE bookID = ?', [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten,  coverImagePath, authorID, bookID])
}


// INSERT INTO book (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, authorID)
// values ('Lolita', 'Lolita', 1955, 'Fiction', 50, 'English', ''