// можно вместо этого использовать пакет http-errors, но особого смысла нету.
// это библиотека для создания HTTP ошибок в Node.js. Он предоставляет простые функции для создания ошибок с заданными статус-кодами и сообщениями. 

const errorMessageList = {
  400: "Bad Request", // Плохой запрос
  401: "Not authorized", // Не авторизован
  403: "Forbidden", // Доступ запрещен
  404: "Not Found", // Не найдено
  405: "Method Not Allowed", // Метод не поддерживается
  409: "Conflict", // Конфликт
  500: "Internal Server Error", // Внутренняя ошибка сервера
  502: "Bad Gateway", // Плохой, ошибочный шлюз
  503: "Service Unavailable", // Сервис недоступен
  504: "Gateway Timeout", // Шлюз не отвечает
  429: "Too Many Requests" // Слишком много запросов
};

const HttpError = (status, messsage=errorMessageList[status]) => {
  const error = new Error(messsage);
  error.status = status;
  return error;
};

module.exports = HttpError;
