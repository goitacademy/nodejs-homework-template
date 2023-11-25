const ctrlWrapper = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = ctrlWrapper;
