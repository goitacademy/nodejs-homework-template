const ctrlrWrapper = ctrlr => {
    const func = async (req, res, next) => {
        try {
            await ctrlr(req, res, next);
        } catch (error) {
            next(error)
        }
    }
    return func;
}

module.exports = ctrlrWrapper;