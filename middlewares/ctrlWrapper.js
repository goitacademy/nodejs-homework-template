const ctrlWrapper = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ctrlWrapper;