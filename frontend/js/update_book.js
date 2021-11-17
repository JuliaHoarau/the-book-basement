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
        document.getElementById('cover-image').value = book.coverImagePath
        document.getElementById('author').value = book.authorID
    })
}


//// Post back updated data!
function postUpdateBook() {
    // Get access to the update user form
    let updateUserForm = document.getElementById("update-book-form")

    // Convert the form data into a JSON string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateUserForm)))

    // Post the JSON data to the API
    fetch("api/books/update", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: formDataJSON
    })
    .then(res => res.json())
    .then(response => {
        alert(response)
        // Redirect back to user list
        window.location.href = "list_books.html"
    })
}

// Create a table of existing book covers and do the same thing.
fetch("/api/authors")
    .then(res => res.json())
    .then((authors) => {
        let authorSelect = document.getElementById("author")

        for (let author of authors) {
            authorSelect.innerHTML 
            += `<option value="${author.authorID}">
                ${author.name + " " + author.surname}
            </option>`
        }

    })

    // fetch("/api/index")
    // .then(res => res.json())
    // .then((covers) => {
    //     let bookSelect = document.getElementById("cover-image")

    //     for (let cover of covers) {
    //         bookSelect.innerHTML 
    //         += `<option value="${cover.coverImagePath}">
    //             ${cover.coverImagePath}
    //         </option>`
    //     }

    // })