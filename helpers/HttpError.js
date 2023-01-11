const messages = {
    400: "Missing field",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "conflict",
}

const HttpError = (status, message = messages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
module.exports = HttpError;