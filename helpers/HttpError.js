const messageList = {
    400: "Bad Request",
    401: "Unathorized",
    403: "Forbiden",
    404: "Not Found",
    409: "COnflict",
}


const HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

export default HttpError;
