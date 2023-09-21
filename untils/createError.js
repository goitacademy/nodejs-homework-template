const createError = (ERROR_TYPE,{message,data}) => {
    return {
        type:ERROR_TYPE,
        message,
        data
    }
}
module.exports = createError