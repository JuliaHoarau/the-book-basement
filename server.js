const express = require("express")
const server = express()
const port = 8080
// //Serve static frontend resources
server.use(express.static("frontend"))

server.use('/api', express.static('backend'))

const mysql = require('mysql2');


// enable middleware for JSON and urlencoded form data
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// // link up book controller
// const bookController = require("./backend/controllers/bookController")
// server.use("/api", bookController)

const userController = require('./backend/controllers/userController')
server.use('/api', userController)

const bookController = require('./backend/controllers/bookController')
server.use('/api', bookController)


//start the express server
server.listen(port, () => {
    console.log("Backend listening on http://localhost:"+port)
}) 