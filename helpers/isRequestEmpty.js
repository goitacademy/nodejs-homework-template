const isRequestEmpty = (requestBody) => {
    return Object.keys(requestBody).length === 0
}

module.exports = isRequestEmpty;