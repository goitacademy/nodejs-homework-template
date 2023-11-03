const handleError = async (func, ...params) => {
    return await func(...params);
};

module.exports = handleError;