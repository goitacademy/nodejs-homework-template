const funcHandler = (func) => {
  const fn = async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return fn;
};

module.exports = funcHandler;
