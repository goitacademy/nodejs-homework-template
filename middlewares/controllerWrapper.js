//обертка контроллера, чтобы try catch каждый раз не писать
const controllerWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error); //через next прокидываем обработку ошибки
    }
  };
};

module.exports = controllerWrapper;
