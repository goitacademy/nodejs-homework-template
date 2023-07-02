const CtrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next); // Виклик контролера з переданими параметрами запиту, відповіді та наступної middleware
    } catch (error) {
      next(error); // Передача отриманої помилки до наступної middleware
    }
  };

  return func; // Повернення обгортки контролера
};

module.exports = CtrlWrapper;
