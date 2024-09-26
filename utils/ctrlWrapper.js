const ctrlWrapper = (ctrlFunc) => {
  const fn = async (req, res, next) => {
    try {
      await ctrlFunc(req, res);
    } catch (error) {
      next(error);
    }
  };

  return fn;
};

module.exports = ctrlWrapper;
