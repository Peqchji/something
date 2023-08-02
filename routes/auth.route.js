const router = require("express").Router();
const auth  = require("@controllers/auth.controller")
const authValidate = require('@validations/auth.validation')

router.post("/login", authValidate, auth)

module.exports = router;
