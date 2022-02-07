const successRes = result => ({
  status: "success",
  code: 200,
  data: {
    result,
  },
});

module.exports = successRes;
