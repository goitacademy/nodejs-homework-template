const controllerWrapper = controller => {
    const func = async (request, response, next) => {
        try {
            await controller(request, response, next);
        } catch (error) {
            next(error);
        }
    };
    return func;
};

module.exports = controllerWrapper;