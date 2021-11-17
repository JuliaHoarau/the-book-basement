const db = require("../database")

module.exports.getChangeLog = () => {
    return db.query("SELECT * FROM changelog")
}