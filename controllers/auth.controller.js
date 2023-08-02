require('module-alias/register')
const authValidate = require('@validations/auth.validation')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require(dotenv).config()

async function loginHandle(req, res) {
  let {user, password} = req.body
}

module.exports = loginHandle