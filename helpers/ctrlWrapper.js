const ctrlWrapper = (contacts) => {
  const func = async (req, res, next) => {
    try {
      await contacts(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
