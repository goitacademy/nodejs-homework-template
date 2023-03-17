const asyncWrapper = (model) => {
    return (req, res, next) => {
        model(req, res).catch(next);
    };
};

const errorHandler = (err, req, res, next) => {
const { status = 500, message = "Internal Server Error" } = err;
res.status(status).json({ message });
}

module.exports = {
    asyncWrapper,
    errorHandler
}