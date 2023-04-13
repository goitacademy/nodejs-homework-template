const ctrlWrapper = (ctrl) => {
  const fn = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      next(err);
    }
  };

  return fn;
};

module.exports = ctrlWrapper;
