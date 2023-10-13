const controllerWrapper = (controller) => {
    const func = async(req, res, next) => {
        try {
         return   await controller(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }
    return func;
}


module.exports = controllerWrapper;