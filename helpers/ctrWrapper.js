const ctrlWrapper = ctrl => {
    const ctrlFunction = async (req, res, next) => {
        try {
            await ctrl(req, res, next)
        } catch (error) {
            next(error)
        }
    }
    return ctrlFunction;
}

module.exports = ctrlWrapper;