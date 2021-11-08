const controller = (control) => {
  return async (req, res, next) => {
    try {
      await control(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = controller;
