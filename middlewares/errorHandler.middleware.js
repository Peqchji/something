function errorHandle(error, req, res, next){
  error.statusCode = error.statusCode || 500
  error.status = error.status || 'Internal Server Error'
  
  return res.status(error.statusCode).json({
    'statusCode': error.statusCode,
    'status': error.status,
    'message': error.message
  })
}

module.exports = errorHandle