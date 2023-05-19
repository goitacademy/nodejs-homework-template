const ctrlWrapper = (method) => {
  const func = async (req, res, next) => {
    try {
      await method(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
