const messages = {
  400: "Missing required name field",
  401: "Unauthorized",
  404: "Not found",
  403: "Forbidden",
  409: "Conflict",
};
const RequestError = (status, message = messages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  
  module.exports = RequestError;