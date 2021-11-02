function postAddAuthor() {
    let createAuthorForm = document.getElementById('add-author-form')

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createAuthorForm)))
    console.log(formDataJSON)

    fetch('api/books/add-author', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: formDataJSON
    })
    .then(res => res.json())
    .then(res => {
        alert('User request sent!')
        window.location.assign('http://localhost:8080/add_book.html')
    })
    .catch(err => {
        console.log('Create user request failed')
    })

}