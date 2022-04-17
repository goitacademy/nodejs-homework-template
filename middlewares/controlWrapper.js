const controlWrapper = control => {
  return async (req, res, next) => {
    try {
      await control(req, res, next);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  };
};

module.exports = controlWrapper;
