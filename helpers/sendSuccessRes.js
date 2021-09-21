const sendSuccessRes = (res, data, status = 200) => {
  res.status(status).json({
    status: 'success',
    code: status,
    data,
  });
};

module.exports = sendSuccessRes;
