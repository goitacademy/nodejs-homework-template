const errorMessages = require("../constants/errorMessages")

const HttpError = (status, message = errorMessages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;