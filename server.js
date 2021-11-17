const express = require("express")
const server = express()
const session = require('express-session')
const port = 8080


// enable middleware for JSON and urlencoded form data
server.use(express.json())
server.use(express.urlencoded({ extended: true }))


// Enable session middleware so we have state
server.use(session({
  secret: 'secret phrase abc123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

// access control middleware
server.use((req, res, next) => {
  // the user is logged in if they have session data
  let userLoggedIn = req.session.user != null
  // define a list of allowed urls for non-logged in users
  let guestallowedURLs = [
    '/login.html',
    '/js/login.js',
    '/css/style.css',
    '/api/users/login',
    '/nav.html',
  ]

  // If the user is logged in
  if (userLoggedIn){
        //Allow the request through
          next()
      } else {
    // Check the guest page is only asking for an allowed resource
    if (guestallowedURLs.includes(req.originalUrl)) {
      next()
    } else {
      res.redirect('/login.html')
    }
  }
})

// //Serve static frontend resources
server.use(express.static("frontend"))

server.use('/frontend/img/', express.static('./frontend/img/'))
// link up book controller
const bookController = require('./backend/controllers/bookController')
server.use('/api', bookController)

// Link userController
const userController = require('./backend/controllers/userController')
server.use('/api', userController)

// Link up the author controller
const authorController = require("./backend/controllers/authorController")
server.use("/api", authorController)

const changelogController = require("./backend/controllers/changelogController")
server.use("/api", changelogController)

// server.get('/', (req, res) => {
//     res.sendFile(__dirname + './frontend/index.html');
//   });

server.use('/api', express.static('backend'))

//start the express server
server.listen(port, () => {
    console.log("Backend listening on http://localhost:"+port)
}) 