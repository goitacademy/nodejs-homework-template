const ctrlWrapper = (ctrl) => {
  const funct = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return funct;
};

module.exports = ctrlWrapper;
