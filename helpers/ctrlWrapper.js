const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error); // Error
    }
  };
  return func;
};

module.exports = ctrlWrapper;
