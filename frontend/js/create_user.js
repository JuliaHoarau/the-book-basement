function postCreateUser() {
    let createUserForm = document.getElementById('create-user-form')

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createUserForm)))
    console.log(formDataJSON)

    fetch('/api/users/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: formDataJSON
    })
    .then(res => res.json())
    .then(res => {
        console.log('User request sent!')
        window.location.href = '/list_users.html'

    })
    .catch(err => {
        console.log('Create user request failed')
    })

}