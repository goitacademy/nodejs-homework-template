const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await (req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.export = ctrlWrapper;
