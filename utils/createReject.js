const createReject = (status, message) => {
    const err = new Error(message)
    err.status = status
    return err
}

module.exports = createReject