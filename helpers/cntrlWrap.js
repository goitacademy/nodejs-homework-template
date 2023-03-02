const cntrlWrap = (cntrl) => {
  return async (req, res, next) => {
    try {
      await cntrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
module.exports = cntrlWrap;
