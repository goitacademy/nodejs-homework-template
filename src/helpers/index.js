const tryCatchWrapper = (asyncFunc) => {
  return async (req, res, next) => {
    try {
      await asyncFunc(req, res, next);
    } catch (e) {
      return next(e);
    }
  };
};

const httpError = (status, message) => {
  const e = new Error(message);
  e.status = status;
  return e;
};

module.exports = {
  tryCatchWrapper,
  httpError,
};
