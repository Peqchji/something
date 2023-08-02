require('module-alias/register')
const User = require('@models/user.model')
const { authValidate } = require('@validations/auth.validation')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

async function loginHandle(req, res) {
  try {
    const { username, password } = req.body
    const foundUser = await User.findOne({ username: username })
    if (!foundUser) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) {
      return res.status(403).send({ message: 'The email address or username you entered isn\'t connected to an account' })
    }
    const accessToken = jwt.sign(
      { 
        sub: foundUser._id,
        iat: Date.now()
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '1d'
      }
    )
    return res.status(200).send({ accessToken: accessToken })
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
  
}

module.exports = loginHandle