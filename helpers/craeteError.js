const messages = {
    400: "Missing required name field",
    404: "Not Found",
}
const createError = (status, message=messages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = createError;