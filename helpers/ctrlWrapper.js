const ctrlWrapper = (ctrl) => {
  const foo = async (req, res, next) => {
    try {
      await ctrl(req, res);
    } catch (error) {
      next(error);
    }
  };

  return foo;
};

module.exports = ctrlWrapper;
