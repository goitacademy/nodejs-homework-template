const messages = {
    400: "Missing required name field", // Bad Request
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict"

}

const HttpError = (status, message = messages[status]) => {
    const error = new Error(message); // create some error for throwing out into catch
    error.status = status;
    return error;
}

module.exports = HttpError;