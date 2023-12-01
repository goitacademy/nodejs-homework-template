const errorWrapper = (func) => async(req, res, next) => {
  try {
    await func(req, res);
  } catch (e) {
    next(e);
  }
};

module.exports = errorWrapper;