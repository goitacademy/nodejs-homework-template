const ResponseResult = (result, message = "success", status = 200) => {
  const response = {
    message,
    status,
    data: {
      result,
    },
  };
  return response;
};

module.exports = ResponseResult;
