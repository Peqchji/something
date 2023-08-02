const mongoose = require('mongoose')
const User = require('@models/user.model')
const { signUpValidate } = require('@validations/signUp.validation')

async function signUp(req, res, next) {
  try {
    const data = await signUpValidate.validateAsync(req.body)
    const doesExist = await User.exists({$or:[
      {email: data.email},
      {username: data.username},
      {phoneNumber: data.phoneNumber}]
    })
    
    if (doesExist) {
      return res.status(422).json({ message: 'email or username is already been signed up' })
    }
    
    const user = new User(data)
    await user.save()
    
    return res.status(201).json({ message: 'sign-up successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = signUp 