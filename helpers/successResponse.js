const successResponse = (res, data, status = 200) => {
  res.status(status).json({
    status: 'Success',
    code: status,
    data,
  })
}

module.exports = successResponse
