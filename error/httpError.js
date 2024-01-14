const messageList = {
    400: "missing fields",
    404: "Not Found",
}

const httpError = (status, message = messageList[status]) => {
    const error = new Error(message)
    error.status = status
    return error
}

export default httpError