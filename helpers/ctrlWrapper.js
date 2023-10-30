const ctrlWrapper = (ctrlFunc) => {
  const foo = async (req, res, next) => {
    try {
      await ctrlFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return foo;
};

module.exports = ctrlWrapper;
