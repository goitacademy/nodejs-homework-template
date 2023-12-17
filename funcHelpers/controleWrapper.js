const wrapControler = ctrl => {
  const wrapFunction = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return wrapFunction;
};

module.exports = wrapControler;
