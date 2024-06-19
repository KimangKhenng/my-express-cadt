const User = require('../models/user')

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
const deleteUserById = (req, res)=>{
    const id = req.params.id
    const user = users.find( (user) =>{
        return user.id == id
    })
    users.pop(user)
    return res.json(user)
}
const createUser = async (req, res)=>{
    const {name, age, email} = req.body
    const user = new User({
        name: name,
        age: age,
        email: email
    })
    const result = await user.save()
    return res.json(user)
}
module.exports = { getUser, getUsers, deleteUserById, createUser }