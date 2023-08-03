const User = require('@models/user.model');
const token = require('@ultility/token.ultility');

const signUp = async function(req, res, next) {
  try {
    const doesExist = await User.exists({
      $or: [
        { email: req.body.email },
        { username: req.body.username },
        { phoneNumber: req.body.phoneNumber },
      ],
    });

    if (doesExist) {
      return res.status(422).json({
          message: 'email, username or phone number are already been signed up',
        });
    }

    await User.create(req.body)
      .then(() => {
        return res.status(201).json({ message: 'sign-up successfully' });
      })
      .catch((error) => {
        if (error) {
          return res.status(503).json({ message: 'Something went wrong' });
        }
        return;
      });
  } catch (error) {
    return next(error);
  }
}

module.exports = signUp;
