const errorMessageList = {
    400:"Bad request",
    401:"Not authorized",
    404: "Not found",
    409:"Conflict"
}

const RequestError = (status,message=errorMessageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}


module.exports = RequestError;