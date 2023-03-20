const ctrlWrapper = (ctrl) => {
  const wrapper = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return wrapper;
};

module.exports = ctrlWrapper;
