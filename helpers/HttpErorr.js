const HttpErorr = (status, message) => {
    const erorr = new Error(message);
    erorr.status = status;
    return error;
}

module.exports = HttpErorr