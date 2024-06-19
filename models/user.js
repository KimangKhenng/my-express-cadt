const mongoose = require('mongoose')
// Define a schema
const userSchema = new mongoose.Schema({
    name: {required: true, type: String},
    age: Number,
    email: {type: String, unique: true},
    tweets: [{type: mongoose.Types.ObjectId, ref: 'Tweet'}]
  })
  // Create a model
  const User = mongoose.model('User', userSchema)
  module.exports = User