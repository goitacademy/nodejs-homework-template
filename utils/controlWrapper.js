const controlWrapper = (control) => {
  const foo = async (req, res, next) => {
    try {
      await control(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return foo;
};

module.exports = controlWrapper;
