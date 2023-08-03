require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateAccessToken = function(username){
  return jwt.sign(
    { 
      sub: username, 
      iat: Date.now()
    }, 
    process.env.ACCESS_TOKEN_SECRET, 
    {
      expiresIn: '1d'
    }
  )
}

const generateRefreshToken = function(username) {
  return jwt.sign(
    { 
      sub: username, 
      iat: Date.now()
    }, 
    process.env.REFRESH_TOKEN_SECRET, 
    {
      expiresIn: '7d'
    }
  )
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}