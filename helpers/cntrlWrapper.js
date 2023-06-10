const cntrlWrapper = (cntrl) => {
  const func = async (req, res, next) => {
    try {
      await cntrl(req, res, next);
    } catch (err) {
      next(err);
    }
  };

  return func;
};

module.exports = cntrlWrapper;
