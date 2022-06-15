const messages = {
  400: "Bad Request: missing required name field",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflit"
};


const createError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error
}

module.exports = createError