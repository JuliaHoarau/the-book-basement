let urlParameters = new  URLSearchParams(window.location.search)

// Access the user ID from the query string (ie ?id=1)
let userID = urlParameters.get('id')

if (userID) {
    // Get existing user information
    fetch(`api/users/${userID}`)
    .then(res => res.json())
    .then(user => {
        console.log(user)
        // Push existing user information into the forms input
        document.getElementById('userID').value = user.userID
        document.getElementById('firstName').value = user.firstName
        document.getElementById('lastName').value = user.lastName
        document.getElementById('email').value = user.email
        document.getElementById('username').value = user.username
        document.getElementById('password').value = user.password
        document.getElementById('accessRights').value = user.accessRights
    })
}

// Post back updated data

function deleteUser() {
    //Get access to the update user form
    let updateUserForm = document.getElementById('update-user-form')
    // convert the form data into a JSON string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateUserForm)))

    // post the JSON data to the API
    fetch('api/users/delete', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: formDataJSON
    })
    .then(res => res.json())
    .then(response => {
        alert(response)
        //redirect back to user list
        window.location.assign('http://localhost:8080/list_users.html')
    })
}

