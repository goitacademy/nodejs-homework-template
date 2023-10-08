const textForMessageFromCode = {
    400: "Bad Request.",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
}

function requesError (status, message = textForMessageFromCode[status]) {

    const error = new Error(message);
    error.status = status;
    return error;
} 

module.exports = requesError;