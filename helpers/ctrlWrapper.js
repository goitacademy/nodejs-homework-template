//  тут будуємо функцію обгортку try catch для всіх запитів
// ctrlWrapper отримує ctrl (getAll getById add updateById deleteById)
const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
      try {
        // викликаємо наш контрол передаючи параметри
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
