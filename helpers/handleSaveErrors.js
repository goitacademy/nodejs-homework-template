const handleSaveErrors = (error, data, next) => {
    // Обработка ошибки на уникальность
    const { name, code } = error;
    error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
    // error.status = 400;
    next();
};

module.exports = handleSaveErrors;
