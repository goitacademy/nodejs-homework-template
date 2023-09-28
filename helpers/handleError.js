const handleError = async (func, ...params) => {
    try {
        return await func(...params);
    } catch (error) {
        throw error;
    }
};

module.exports = handleError