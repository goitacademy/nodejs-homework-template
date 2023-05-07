const cntrlWrapper = (cntrl) => {
  const func = async (req, res, next) => {
    try {
      await cntrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = cntrlWrapper;
