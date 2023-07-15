const { status } = require("express/lib/response");

const HttpError = (status, message)=>{
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;