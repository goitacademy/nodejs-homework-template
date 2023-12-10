const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
