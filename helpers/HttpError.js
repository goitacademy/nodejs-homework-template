const messages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbiden",
    404: "Not Found",
    409: "Conflict"
}

const HttpError = (status, message = messages[status]) => {
    console.log(messages[status]);
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;