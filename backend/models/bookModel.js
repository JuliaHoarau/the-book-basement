const db = require('../database')

module.exports.getAllBooks = () => {
    return db.query('SELECT bookID, bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, authorID from book')
}

module.exports.getBookById = (id) => {
    return db.query('SELECT * from book WHERE bookID = ?', [id])
}

module.exports.addAuthor = (name, surname, nationality, birthYear, deathYear) => {
    return db.query('INSERT INTO author (name, surname, nationality, birthYear, deathYear)' + `VALUES (?, ?, ?, ?, ?)`, [name, surname, nationality, birthYear, deathYear])
}


module.exports.addBook = (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, authorID) => {
    return db.query('INSERT INTO book (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, authorID)' + `VALUES (?, ?, ?, ?, ?, ?, ?)`, [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, authorID])
}

module.exports.deleteBook = (bookID) => {
    return db.query('DELETE FROM book WHERE bookID =?', [bookID])
}

module.exports.updateBook = (bookID, bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, authorID) => {
    return db.query('UPDATE users SET bookTitle = ?, originalTitle = ?, yearofPublication = ?, genre = ?, millionsSold = ?, languageWritten = ?, authorID =? WHERE userID = ?', [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, authorID])
}


// INSERT INTO book (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, authorID)
// values ('Lolita', 'Lolita', 1955, 'Fiction', 50, 'English', ''