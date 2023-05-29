const decorator = (controller) => {
  const someFunc = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return someFunc;
};

module.exports = decorator;
