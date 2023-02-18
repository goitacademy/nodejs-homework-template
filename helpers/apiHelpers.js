const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const controllerWrapper = (controller) => {
  return (req, res, next) => {
    try {
      controller(req, res);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = { isEmpty, controllerWrapper };
