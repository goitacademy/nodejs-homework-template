
function getError(status, message) {
    const error = new Error(message)
    error.status = status;
    error.mesage = message;
    return error
}

module.exports = getError