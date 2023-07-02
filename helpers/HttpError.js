const messages = {
    400: "Missing required name field", // Bad Request
    404: "Not Found",
}

const HttpError = (status, message = messages[status]) => {
    const error = new Error(message); // create some error for throwing out into catch
    error.status = status;
    return error;
}

module.exports = HttpError;