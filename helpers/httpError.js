const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Firbidden",
    404: "Not Found",
    409: "Conflict"
}

const httpError = (status, message = messageList[status]) => {
    console.log(status)
    const error = new Error(message);
    error.status = status;
    return error;
}

export default httpError;