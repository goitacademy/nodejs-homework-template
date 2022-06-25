function createResponse(status, res, data) {
  return res.status(status).json({
    status: "success",
    code: status,
    data,
  });
}

module.exports = createResponse;
