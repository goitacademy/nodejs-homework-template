const controllerWrapper = controllerFunc => {
    const wrapperFunc = async (req, res, next) => {
        try {
            await controllerFunc(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }
    return wrapperFunc;
};

module.exports = controllerWrapper;