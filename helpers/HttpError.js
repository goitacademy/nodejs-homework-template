// const RequestError = (status, message) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

// module.exports = RequestError;

const errosMessageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};
const HttpError = (status, message = errosMessageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;