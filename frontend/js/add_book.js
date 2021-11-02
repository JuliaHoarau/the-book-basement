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
        console.log('User request sent!')
window.location.assign('http://localhost:8080/list_books.html')
    })
    .catch(err => {
        console.log('Create user request failed')
    })

}