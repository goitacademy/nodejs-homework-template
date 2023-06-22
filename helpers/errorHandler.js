const tryCatchHandler = (clb) => {
  const func = async (req, res, next) => {
    try {
      await clb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = tryCatchHandler;
