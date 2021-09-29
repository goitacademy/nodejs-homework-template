const sendSuccessResponse = (res, data, status = 200) => {
  res.status(status).json({
    status: 'success',
    code: status,
    data,
  })
}

module.exports = sendSuccessResponse
