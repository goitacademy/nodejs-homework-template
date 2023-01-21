const successResult = (res, code, message, result) => {
  return res.json({
    message,
    code,
    data: result,
  });
};

module.exports = { successResult };
