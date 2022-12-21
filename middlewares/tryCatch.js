const tryCatch = (ctrl) => {
  return async (res, req, next) => {
    try {
      await ctrl(res, req, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = tryCatch;

// получает контролер (функцию обработчика)
// обворачивает ее в другую функцию
// пробует вызвать ее в трай кеч
// если происходит ошибка передает дальше ошибку (миблвар с 4 параметрами) + обрывает функцию
