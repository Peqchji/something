const signOut = function(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(204).send( { message: 'No Content'} )
    }
    
    res.clearCookie('refreshToken', { 
      secure: true,
      httpOnly: true
    })
    
    return res.status(200).send({ message: 'logout' })
  } catch(error) {
    return next(error);
  }
}

module.exports = signOut