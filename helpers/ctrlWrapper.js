const ctrlWrapper = ctrl => {
  const func = async (req, resp, next) => {
    try {
      await ctrl(req, resp);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
