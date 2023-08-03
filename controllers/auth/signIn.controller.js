require('module-alias/register');
const User = require('@models/user.model');
const bcrypt = require('bcrypt');
const token = require('@ultility/token.ultility');
require('dotenv').config();

const signIn = async function(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!password) {
      return res.status(422).send({ message: 'No password in request' });
    }

    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      return res.status(404).send({
        message:
          'The email or username you entered isn\'t connected to an account',
      });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(403).send({ message: 'Wrong password' });
    }

    const accessToken = await token.generateAccessToken(foundUser.username);
    const refreshToken = await token.generateRefreshToken(foundUser.username);
    res.cookie('refreshToken', refreshToken, {
      secure: process.env.NODE_ENV == 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      accessToken: accessToken,
    });
  } catch(error) {
    return next(error)
  }
}

module.exports = signIn;
