function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      res.status(error.code).json({ message: error.message });
    }
  };
}

module.exports = {
  tryCatchWrapper,
};
