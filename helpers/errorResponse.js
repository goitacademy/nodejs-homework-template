const errorRespones = (res, error, status = 400) => {
  return res.status(status).json({
    status: error,
    code: status,
    message: error.message,
  })
}

module.exports = errorRespones
