const CtrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error); // Передача отриманої помилки до наступної middleware
    }
  };

  return func; // Повернення обгортки контролера
};

module.exports = CtrlWrapper; // Експорт функції CtrlWrapper для використання в інших файлів
