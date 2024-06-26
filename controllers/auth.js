const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const axios = require('axios')

const { validationResult } = require('express-validator');
const { signJWT } = require("../utils");

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
    const token = signJWT(user._id, user.email)
    return res.json(token)
})

const signupUser = asyncHandler(async (req, res) => {
    const {
        username,
        name,
        age,
        email,
        password,
        facebookURL } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new User({ username, age, name, email, facebookURL, password: hashedPassword });
    const result = await user.save();
    res.status(201).json({ message: 'User created successfully' });
})

const showGoogleOAuthScreen = asyncHandler(async (req, res) => {
    const uri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK}&response_type=code&scope=profile email openid`
    return res.redirect(uri)
})

const handleGoogleLogin = asyncHandler(async (req, res) => {
    const code = req.query.code
    // 1 - Exchange one-time code for access_token(JWT) from Google API
    // npm install axios
    const url = 'https://oauth2.googleapis.com/token'
    const { data } = await axios.post(url, {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.GOOGLE_CALLBACK,
        grant_type: 'authorization_code'
    })
    // 2 - Use access_token to get userinfo from Google API
    const access_token = data.access_token
    const get_user_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    const reponse = await axios.get(get_user_url, {
        headers: { Authorization: `Bearer ${access_token}` }
    })
    const userprofile = reponse.data
    // 3 - Register user in our database
    const user = await User.findOne({ email: userprofile.email })
    if (!user) {
        // Register new user
        const newUser = new User({
            name: userprofile.name,
            email: userprofile.email,
            userType: "sso",
            username: userprofile.given_name + '-' + Date.now()
        })
        const result = await newUser.save()
        const token = signJWT(result._id, result.email)
        return res.json(token)
    }
    // 4 - Sign user with our own JWT
    const token = signJWT(user._id, user.email)
    return res.json(token)
})

module.exports = { loginUser, signupUser, showGoogleOAuthScreen, handleGoogleLogin }