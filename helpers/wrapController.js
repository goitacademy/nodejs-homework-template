const wrapController = (wrap) => {
  const wrappedHandler = async (req, res, next) => {
    try {
      await wrap(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return wrappedHandler;
};

module.exports = wrapController;
