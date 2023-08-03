require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('@models/user.model');
const token = require('@ultility/token.ultility');

const refreshToken = function(req, res, next) {
  try {
    const cookies = req.cookies;
    if (!cookies.refreshToken) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const refreshToken = cookies.refreshToken;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async function(error, payload) {
        if (error) {
          return res.status(403).send({ message: 'Forbidden' });
        }

        const username = payload.sub;
        const foundUser = await User.findOne({ username: payload.sub });
        if (!foundUser) {
          return res.status(401).send({ message: 'Unauthorized' });
        }

        const accessToken = await token.generateAccessToken(username);

        return res.status(200).send({ accessToken: accessToken });
      }
    );
  } catch(error) {
    return next(error);
  }
}

module.exports = refreshToken;
