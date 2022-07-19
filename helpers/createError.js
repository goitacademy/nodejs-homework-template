const messages = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbbiden",
    404: "Not found",
    409: "Conflict"
};

const createError = (status, message = messages[status]) => {
    const error = new Error(message);
    error.status = status;
   return error;
};

module.exports = createError;