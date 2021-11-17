// Get url parameters (query string)
let urlParameters = new URLSearchParams(window.location.search)

// Access the book ID from the query string (ie. ?id=1)
let bookID = urlParameters.get("id")

function postDeleteBook() {
    // Check that a book ID was specified
    if (bookID) {
        // Post the JSON data to the API
        fetch("api/books/delete", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({bookID: bookID})
        })
        .then(res => res.json())
        .then(response => {
            alert(response)
            // Redirect back to book list
            window.location.href = "list_books.html"
        })
    }
}