const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')



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
    let user = req.body

    userModel.createUser(
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.password,
        user.accessRights
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

    // Each of the names below reference the "name" attribute in the form
    userModel.updateUser(
        user.userID,
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.password,
        user.accessRights
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

router.post('/users/delete', (req, res) => {
    // Access the user id from the body of the request
    let userID = req.body.userID

    // ask the model to delete the user with userID
    userModel.deleteUser(userID)
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json(result[0])
            } 
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json('failed to delete user - query error')
        })
})

router.post('/login', (req, res) => {
    let email = req.body.email
    let password = req.body.password

    userModel.login(email, password)
    .then((result) => {
        res.status(200).json('user created with id')
    })
    .catch((error) => {
        res.status(500).json('query error- failed to create user')
    })
})



// This allows the server.js to import (require) the routes defined in this file
module.exports = router