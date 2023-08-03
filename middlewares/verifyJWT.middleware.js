require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('@models/user.model');

const strategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("accessToken"),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET, 
    algorithms: ['RS256'] 
  },
  function (payload, done) {
    User.findOne({ username: payload.sub })
      .then((user) => { 
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((error) => done(error, null));
  }
);

passport.use(strategy);
const verifyJWT = passport.authenticate('jwt', { session: false });

module.exports = verifyJWT;
