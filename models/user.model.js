const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide phone number'],
    unique: true,
  },
  refreshToken: {
    type: String,
  },
});

UserSchema.pre('save', async function(next) {
  try {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', UserSchema);
