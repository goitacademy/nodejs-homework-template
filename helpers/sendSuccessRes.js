const sendSuccessRes = (res, data, status = 200) => {
  res.status(status).json({
    status: 'success',
    code: status,
    ...(data ?? data)
  })
}

module.exports = sendSuccessRes
