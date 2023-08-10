// створюємо функцію-обгортку middleware (проміжне ПЗ) для обробки контролерів, яка обгортає функції-контролери (обробники запитів) та додає обробку помилок.
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
