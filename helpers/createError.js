const message = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};
function createError({ status, message = message[status] }) {
  let error = new Error(message);
  error.status = status;
  return error;
}
module.exports = {
  createError,
};
