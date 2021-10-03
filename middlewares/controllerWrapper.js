// используем єту фун-ю обвертку, чтобы не писать в каждом контролере (controllers/contact) try/catch

const controllerWrapper = (ctrl) => {
  return async(req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = controllerWrapper;
