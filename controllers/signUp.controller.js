const mongoose = require('mongoose')
const User = require('@models/user.model')
const { signUpValidate } = require('@validations/signUp.validation')

async function signUp(req, res, next) {
  try {
    const doesExist = await User.exists({$or:[
      { email: req.body.email },
      { username: req.body.username }
    ]})
    if (doesExist) {
      return res.status(422).json({ message: 'email or username is already been signed up' })
    }
    const user = new User(req.body)
    if (await user.save()) {
      return res.status(503).json({ message: 'something went wrong' })
    }
    return res.status(201).json({ message: 'sign-up successfully' })
  } 
  catch (error) {
    return res.status(403).json({ message: error.message })
  }
}

module.exports = signUp 