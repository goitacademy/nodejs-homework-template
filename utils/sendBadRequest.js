const sendBadRequest = (res, id, status = 400) => {
  res.status(status).json({
    status: 'error',
    code: status,
    message: 'Bad request: missing fields',
  })
}

module.exports = { sendBadRequest }
