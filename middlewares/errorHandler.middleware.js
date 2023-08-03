const errorHandle = function(error, req, res, next) {
  error.statusCode = error.statusCode || 500;
  
  return res.status(error.statusCode).json({
    route: `${req.originalUrl} went wrong`, 
    message: `${error.name}: ${error.message}`,
  });
}

module.exports = errorHandle;