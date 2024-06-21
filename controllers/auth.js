const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const { validationResult } = require('express-validator');

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.json({ message: "User not found!" })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.json({ message: "Email or password is incorrect!" })
    }
    // Sign JWT 
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: '2h',
        issuer: 'api.cadt.com',
        audience: 'cadt.com'
    })
    return res.json(token)
})

const signupUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    const result = await user.save();
    res.status(201).json({ message: 'User created successfully' });
})

module.exports = { loginUser, signupUser }