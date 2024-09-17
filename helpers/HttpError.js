const errorMasegeList = {
    401: "Not authorized",
}

const HttpError = (status, massage = errorMasegeList[status]) => {
    const error = new Error(massage)
    error.status = status
    return error
}
module.exports = HttpError