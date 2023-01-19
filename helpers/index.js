function ErrorHttp(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function ctrlWrapper(ctrl) {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = {
  ErrorHttp,
  ctrlWrapper,
};
