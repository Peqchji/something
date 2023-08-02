const joi = require('joi').extend(require('joi-phone-number'))

const signUpValidate = new joi.object({
  // fname: joi.string()
  //   .min(1)
  //   .max(100)
  //   .required(),
  // lname: joi.string()
  //   .min(1)
  //   .max(100)
  //   .required(),
  // gender: joi.string()
  //   .valid('Male', 'Female', 'Other')
  //   .required(),
  email: joi.string()
    .email()
    .required(),
  username: joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .min(4)
    .max(30)
    .required(),
  password: joi.string()
    .min(8)
    .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
    .required()
    .label("Password")
    .messages({
      "string.min": "Must have at least 8 characters",
      "object.regex": "Must have at least 8 characters",
      "string.pattern.base": "enter your custom error here..."
    }),
  phoneNumber: joi.string()
    .phoneNumber({ defaultCountry: 'TH', strict: true })
    .required()
})

module.exports = async function(req, res, next) {
  try {
    const data = await signUpValidate.validateAsync(req.body)
    next()
    return
  }
  catch (error) {
    return res.status(403).json({ message: error.message })
  }
}
