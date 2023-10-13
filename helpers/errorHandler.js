const messageDefault = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  409: "Conflict",
};

// функція прокидання помилки для блоку try
function errorHandler(status, message) {
  const error = new Error(); //створення нової помилки
  error.status = status;
  error.message = message || messageDefault[status];
  throw error;
}

module.exports = errorHandler;
