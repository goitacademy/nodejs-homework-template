function controlslWrapper(control) {
    return async function (req, res, next) {
        try {
            await control(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = controlslWrapper;