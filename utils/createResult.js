const createResult = (res, result, message) => {
  return res.json({
    message: message || "success",
    code: 200,
    data: {
      result: result,
    },
  });
};

module.exports = { createResult };
