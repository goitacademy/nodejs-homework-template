// створюємо функцію-обгортку для try\catch (уникаємо повторення try\catch та скорочуємо код)
const ctrlWrapper = (ctrl) => {
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
