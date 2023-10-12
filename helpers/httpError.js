const errorMessageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    409: "Conflict",
    410: "Gone",
}

const httpError = (status, message = errorMessageList[status]) => {
    const err = new Error(message);
    err.status = status;
    return err;
};

module.exports = httpError;
