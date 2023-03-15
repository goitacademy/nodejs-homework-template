const asyncWrapper = (model) => {
    return (req, res, next) => {
        model(req, res).catch(next);
    };
};

module.exports = {
    asyncWrapper
}