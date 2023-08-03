// обертка для контроллера, которая оборачивает в блок try_catch каждый контроллер
const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
