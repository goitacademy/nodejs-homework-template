const twoHundred = (data) => {
    return { message: 'Success', code: 200, data }
}

const twoZeroOne = (data) => {
    return { message: 'Success', code: 201, data }
}

const fourHundred = (message = "Problem with fields") => {
    return { message, code: 400 }
}

const fourZeroFour = () => {
    return { message: "Not found", code: 404 }
}

module.exports = {
    twoHundred,
    twoZeroOne,
    fourHundred,
    fourZeroFour
}