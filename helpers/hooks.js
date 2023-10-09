const handleSaveError = ((error, data, next) => {
    error.status = 404;
    next();
})

module.exports = handleSaveError;
