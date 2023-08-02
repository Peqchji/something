const joi = require('joi')

const authValidate = new joi.object({
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
})

module.exports = module.exports = async function(req, res, next) {
  try {
    const data = await authValidate.validateAsync(req.body)
    next()
    return
  }
  catch (error) {
    return res.status(403).json({ message: error.message })
  }
}