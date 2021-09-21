const sendSeccessRes = (res, data, status = 200, message) => {
  res.status(status).json({
    status: 'seccess',
    code: status,
    data,
    message,
  })
}

module.exports = sendSeccessRes
