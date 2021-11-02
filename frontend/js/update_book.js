let urlParameters = new  URLSearchParams(window.location.search)

// Access the user ID from the query string (ie ?id=1)
let bookID = urlParameters.get('id')

if (bookID) {
    // Get existing user information
    fetch(`api/books/${bookID}`)
    .then(res => res.json())
    .then(book => {
        console.log(book)
        // Push existing user information into the forms input
        document.getElementById('bookID').value = book.bookID
        document.getElementById('bookTitle').value = book.bookTitle
        document.getElementById('originalTitle').value = book.originalTitle
        document.getElementById('yearofPublication').value = book.yearofPublication
        document.getElementById('genre').value = book.genre
        document.getElementById('millionsSold').value = book.millionsSold
        document.getElementById('languageWritten').value = book.languageWritten
    })
}

// Post back updated data

function postUpdateBook() {
    //Get access to the update book form
    let updateBookForm = document.getElementById('update-book-form')
    // convert the form data into a JSON string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateBookForm)))

    // post the JSON data to the API
    fetch('api/books/update', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: formDataJSON
    })
    .then(res => res.json())
    .then(response => {
        alert(response)
        //redirect back to user list
        window.location.href = 'list_books.html'
    })
}

