const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const validator = require('validator')
const userModel = require('../models/userModel')
const { reset } = require('nodemon')



router.get('/users', (req, res) => {
    userModel.getAllUsers()
    .then((results) =>{
        res.status(200).json(results)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('query error')
    })
})

router.post('/users/create', (req, res) => {

   // Only allow admins to use this endpoint 
    if (req.session.user.accessRights != "admin") {
        // send back an error message
        res.status(403).json('admin only action')
        // stop response handler here
        return;
    }
    let user = req.body

    //only allow valid emails 
    if (validator.isEmail(user.email) == false) {
        res.status(300).json('invalid email')
        return;
    }
    // has the password before inserting the db
    let hashedPassword = bcrypt.hashSync(user.password, 6)

    userModel.createUser(
        validator.escape(user.firstName),
        validator.escape(user.lastName),
        validator.escape(user.email),
        validator.escape(user.username),
        hashedPassword, // now storing the hashed password
        validator.escape(user.accessRights)
    )
    .then((result) => {
        res.status(200).json('user created with id')
    })
    .catch((error) => {
        res.status(500).json('query error- failed to create user')
    })
})

// Define endpoint for user id 
router.get('/users/:id', (req, res) => {
    userModel.getUserById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to get user by id")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json('failed to get user - query error')
        })
})

// Define an /api/user/update endpoint that updates an existing user
router.post('/users/update', (req, res) => {
    // thre req.body represents the posted json data
    let user = req.body

    // if the password does not start with a $, then hash it
    let hashedPassword = user.password
    if (!user.password.startsWith('$2b$')) {
        hashedPassword = bcrypt.hashSync(user.password, 6)
    }

    // Each of the names below reference the "name" attribute in the form
    userModel.updateUser(
        validator.escape(user.userID),
        validator.escape(user.firstName),
        validator.escape(user.lastName),
        validator.escape(user.email),
        validator.escape(user.username),
        hashedPassword,
        validator.escape(user.accessRights)
    )
    .then((result) => {
        if (result.affectedRows > 0) {
            res.status(200).json('user updates')
        } else {
            res.status(404).json('user not found')
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('failed to update user - query error')
    })
})

router.post("/users/delete", (req, res) => {
    // Access the user id from the body of the request
    let userId = req.body.userId

    // Ask the model to delete the user with userId
    userModel.deleteUser(userId)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("user deleted")
            } else {
                res.status(404).json("user not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to delete user - query error")
        })
})

router.post('/users/login', (req, res) => {
// Get the login information
    let login = req.body

// Find the user with a matching username
    userModel.getUserByUsername(login.username)
    .then((results) => {
        // did we find a user with matching username?
        if (results.length > 0) {
            // Get the found user 
            let user = results[0]

            // verify the users password
            if (bcrypt.compareSync(login.password, user.password)) {
                // this user is now authenticated 

                // set up the session
                req.session.user = {
                    userID: user.userID,
                    accessRights: user.accessRights,
                }
                res.status(200).json('login successful')
            } else {
                // runs if the passwords do not match
                res.status(401).json('login failed')
            }
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('failed to login - query error')
    })

})

router.post('users/logout', (req, res) => {
// Destroy the session
    req.session.destroy()
    res.status(200).json('logged out')

})





// This allows the server.js to import (require) the routes defined in this file
module.exports = router