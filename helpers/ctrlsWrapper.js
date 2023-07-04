const ctrlsWrapper = (func) => {
  const wrap = async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return wrap;
};

module.exports = ctrlsWrapper;
