const messages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Server error",
  };
  
  const HttpError = (status, message = messages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  
  module.exports = HttpError;