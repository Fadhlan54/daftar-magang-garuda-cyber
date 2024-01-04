module.exports = (err, req, res, next) => {
  const error = {}
  error.statusCode = err.statusCode || 500
  error.status = false
  error.message = err.message || 'Internal Server Error'

  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  })
}
