function postLogoutUser()  {
    fetch('/api/users/logout', {
        method: 'POST',
    })
    .then(res => res.json)
    .then(res => {
        window.location.href ='index.html'
    })
    .catch(error => {
        console.log(error)
    })
}