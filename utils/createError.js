const createError = (ERROR_TYPE, { message}) => {
    return {
        type: ERROR_TYPE,
        message,
    }
};

module.exports = createError;