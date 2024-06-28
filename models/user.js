const mongoose = require('mongoose')
// Define a schema

const userSchema = new mongoose.Schema({
  name: { required: true, type: String },
  //  Integer
  age: Number,
  email: { type: String, unique: true },
  tweets: [{ type: mongoose.Types.ObjectId, ref: 'Tweet' }],
  // At least 8 password, Capital, smallcase, Number
  password: { type: String },
  userType: {
    type: String,
    enum: ["sso", "normal"],
    default: 'normal'
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "editor", "user"],
    default: 'user'
  },
  // URL for Facebook
  facebookURL: { type: String },
  // Username(letter, number, alphanumeric)
  username: { type: String },
  createdDate: { type: Date, default: Date.now() }
})
// Create a model
const User = mongoose.model('User', userSchema)
module.exports = User