const errorMessageList = {
    400: "Bad Request",   // Неверный запрос
    401: "Unauthorized", // Неавторизованный
    403: "Forbidden",    // Запрещенный
    404: "Not found",   // Не найдено
    409: "Conflict",    // Конфликт
  };
  
  const HttpError = (status, message = errorMessageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  
  module.exports = HttpError;
  