const joi = require('joi').extend(require('joi-phone-number'));

const signUpValidator = new joi.object({
  email: joi.string().email().required(),
  username: joi
    .string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .min(4)
    .max(30)
    .required(),
  password: joi
    .string()
    .min(8)
    .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
    .required()
    .label('Password')
    .messages({
      'string.min': 'Must have at least 8 characters',
      'object.regex': 'Must have at least 8 characters',
      'string.pattern.base': 'enter your custom error here...',
    }),
  phoneNumber: joi
    .string()
    .phoneNumber({ defaultCountry: 'TH', strict: true })
    .required(),
});

const signUpValidate = async function(req, res, next) {
  try {
    await signUpValidator.validate(req.body);
    return next();
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

module.exports = signUpValidate;
