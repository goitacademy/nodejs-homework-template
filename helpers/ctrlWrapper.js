const ctrlWrapper = (ctrl) => {
  const func = async (req, resp, next) => {
    try {
      await ctrl(req, resp, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
