const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username']
  },
  password: {
    type: String,
    required: [true, 'Please provide password']
  },
  email: {
    type: String,
    required: [true, 'Please provide email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide phone number']
  }
})

UserSchema.pre('save', async function(next) {
  try {
    const user = this
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword
    next()
  }
  catch(error) {
    console.error(error)
  }
})

module.exports = mongoose.model('User', UserSchema)