const messageList = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Firbidden",
    404: "Not found",
    409: "Conflict"

}

export const HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}