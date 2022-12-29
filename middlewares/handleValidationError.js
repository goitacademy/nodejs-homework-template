const isConflict = ({ name, code }) => (name === "MongoServerError" && code === 11000);

const handleValidationError = (error, data, next) => {
    error.status = isConflict(error) ? 409 : 400;
    next();
};

module.exports = handleValidationError;