const ERROR_TYPES = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
}
const ErrorStatus = (status, message = ERROR_TYPES[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

export default ErrorStatus;