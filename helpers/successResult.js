const successResult = (res, code, message, result) => {
  return res.json({
    message,
    code,
    data: result,
  });
};

const successAddData = (res, code, message) => {
  return res.json({
    message,
    code,
  });
};

module.exports = { successResult, successAddData };
