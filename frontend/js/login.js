function postLogin() {
    let loginForm = document.getElementById('login-form')

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(loginForm)))
    console.log(formDataJSON)

    fetch('/api/login', {
        method: "POST",
        'Content-Type': 'application/json',
        body: formDataJSON
    })
    .then((response) => response.json())
    .then((result) => {
        console.log('user match')
    }).catch(err => {
        console.log("login request failed")
    })
}