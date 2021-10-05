

const controllerWrapper = (ord) => {

    return async (req, res, next) => {
        try {
            await ord(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = controllerWrapper