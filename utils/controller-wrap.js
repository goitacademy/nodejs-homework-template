const controllerWrap = controller => {
    const wrapper = async(req, res, next) => {
        try {
            await controller(req, res, next);
        }
        catch (err) {
            next(err);
        }
    }
    return wrapper;
}

module.exports = controllerWrap;