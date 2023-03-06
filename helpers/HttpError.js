const messages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
};

function HttpError(status, message = messages[status]) {
  const err = new Error(message);
  err.status = status;
  return err;
}

module.exports = HttpError;