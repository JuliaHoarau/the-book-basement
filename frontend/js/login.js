function postLoginUser() {
    let loginUserForm = document.getElementById('login-form')

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(loginUserForm)))
    console.log(formDataJSON)

    // post the form data to the backend
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formDataJSON
    })
    .then(res => res.json())
    .then(res => {
        alert(res)
        window.location.href = 'index.html'
    })
    .catch(error => {
        console.log('user login failed')
    })
}