const User = require('../models/user')

const getUser = async (req, res) => {
    // If string in userId
    const userId = req.params.id
    const user = await User.findById(userId)
    return res.json(user)
}
const getUsers = async (req, res) => {
    // Get all by using find method
    const users = await User.find().populate('tweets')
    return res.json(users)
}
const deleteUserById = async (req, res)=>{
    const id = req.params.id
    const reuslt = await User.deleteOne({_id: id})
    return res.json(reuslt)
}
const createUser = async (req, res, next)=>{
    const {name, age, email} = req.body
    try {
        const user = new User({
            name: name,
            age: age,
            email: email
        })
        const result = await user.save()
        return res.json(result)
    }catch (err){
        next(Error(err.errmsg))
    }
}
module.exports = { getUser, getUsers, deleteUserById, createUser }