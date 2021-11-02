const db = require('../database')


module.exports.getAllUsers = () => {
    return db.query('SELECT userID, firstName, lastName, email, username, accessRights FROM users')
}

module.exports.createUser = (firstName, lastName, email, username, password, accessRights) => {
    return db.query('INSERT INTO users (firstName, lastName, email, username, password, accessRights)' + `VALUES (?, ?, ?, ?, ?, ?)`, [firstName, lastName, email, username, password, accessRights])
}

// hmmmm
module.exports.getUserById = (id) => {
    return db.query('SELECT * from users WHERE userID = ?', [id])
}

module.exports.updateUser = (userID, firstName, lastName, email, username, password, accessRights) => {
    return db.query('UPDATE users SET firstName = ?, lastName = ?, email = ?, username = ?, password = ?, accessRights = ? WHERE userID = ?', [firstName, lastName, email, username, password, accessRights, userID])
}

module.exports.deleteUser = (userID) => {
    return db.query('DELETE FROM users WHERE userID =?', [userID])
}

module.exports.login = (email, password) => {
    db.query('SELECT email, password from users where email = ? and password = ?', [email, password])
}
