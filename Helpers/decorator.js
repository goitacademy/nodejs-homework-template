const decorarot = (control) => {
  const fun = async (req, res, next) => {
    try {
      await control(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return fun;
};

module.exports = decorarot;
