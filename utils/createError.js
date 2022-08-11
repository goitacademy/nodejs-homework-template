const errorMessages = {
    400: "Bad request",
    404: "Not found",
}

const createError = (status, message = errorMessages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = createError;