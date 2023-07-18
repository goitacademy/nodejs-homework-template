const ctrlWrapper = getAll => {
    const func = async (req, res, next) => {
        try {
            await getAll (req, res, next)
        } catch (error) {
            next(error)
        }
    }
    return func;
}

module.exports = ctrlWrapper