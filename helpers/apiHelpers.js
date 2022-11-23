const asyncWrapper = (controller) => {
    return (req, res, next) => {
        controller(req, res).catch(next);
    };
};

const errorHandler = (err, _, res, __) => {
    const {
        status = 500,
        message = "Server internal error"
    } = err;
    res.status(status).json({ message });
};

const requestError = (status, message) => {
    const err = new Error(message);
    err.status = status;
    throw err;
};

module.exports = {
    asyncWrapper,
    errorHandler,
    requestError,
};
