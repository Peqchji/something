const router = require("express").Router();
const signUp  = require("@controllers/signUp.controller")

router.post("/signup", signUp)

module.exports = router;
