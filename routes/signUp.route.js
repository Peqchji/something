const router = require("express").Router();
const signUp  = require("@controllers/signUp.controller")
const signUpValidate = require('@validations/signUp.validation')

router.post("/signup", signUpValidate, signUp)

module.exports = router;
