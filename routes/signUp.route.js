const router = require("express").Router();
const {
  signUp,
} = require("@controllers/register/")
const signUpValidate = require('@validations/signUp.validation')

router.post("/sign-up", signUpValidate, signUp)

module.exports = router;
