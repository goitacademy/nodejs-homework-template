const getSuccessResponse = (result, code = 200) => ({
  status: "success",
  code,
  data: { result },
});

module.exports = { getSuccessResponse };
