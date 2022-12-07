const messages = {
    400: "Bad request",
    401: "Unauthorizied"
}

function HttpError(status, message = messages[status]) {
    const error = new Error(message)
    error.status = status
    return error
}

module.exports = { HttpError }