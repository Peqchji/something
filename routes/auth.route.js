const router = require('express').Router();
const verifyJWT = require('@middlewares/verifyJWT.middleware');
const { 
  signIn,
  refreshToken,
  logOut
} = require('@controllers/auth/')
const authValidate = require('@validations/auth.validation')

router.post('/sign-in', authValidate, signIn)
router.get('/refresh', refreshToken)
router.post('/logout', logOut)
router.get('/testJWT', verifyJWT, (req, res) => { 
  return res.status(200).send('JWT verified')
})

module.exports = router;
