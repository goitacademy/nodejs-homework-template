function tryCatchWrapper(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  tryCatchWrapper,
};
