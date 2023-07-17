const ctrlWrapper = (ctlr) => {
  const fn = async (req, res, next) => {
    try {
      await ctlr(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return fn;
};
module.exports = ctrlWrapper;
