const joi = require('joi');

const authValidator = new joi.object({
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
    .label('Password'),
});

const authValidate = async function(req, res, next) {
  try {
    await authValidator.validate(req.body);
    return next();
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

module.exports = authValidate;
