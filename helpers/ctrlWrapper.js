const ctrlWrapper = (ctrl) => {
  const func = async (res, req, next) => {
    try {
      await ctrl(res, req, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
