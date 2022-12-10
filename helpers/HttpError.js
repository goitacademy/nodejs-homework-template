const messages = {
    400: "Bad request",
    401: "Unauthorzed",
    403: "Forbidden",
    404: "Not found",
    405:"Conflict"
}

const HttpError = (status, message = messages) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;