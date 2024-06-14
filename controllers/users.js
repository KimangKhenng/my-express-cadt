const { users } = require('../db/db.js')

const getUser = (req, res) => {
    // If string in userId
    const userId = req.params.id
    const user = users.find((user) => {
        return user.id == userId
    })
    if (!user) {
        return res.json({})
    }
    res.json(user)
}

const getUsers = (req, res) => {
    return res.json({ users })
}

module.exports = { getUser, getUsers }