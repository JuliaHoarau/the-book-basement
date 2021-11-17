function postAddBook() {
    let addBookForm = document.getElementById('add-book-form')

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(addBookForm)))
    console.log(formDataJSON)

    fetch('api/books/add-book', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: formDataJSON
    })
    .then(res => res.json())
    .then(res => {
        console.log('Add book request sent!')
window.location.href = "list_books.html"
    })
    .catch(err => {
        console.log('Create book request failed')
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