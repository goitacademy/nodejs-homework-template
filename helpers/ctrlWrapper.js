const ctrlWrapper = ctrl => {
    const func = async (rec, res, next) => {
        try {
            await ctrl(rec, res, next);
        } catch (error) {
            next(error);
        }
    }
    return func;
}

module.exports = ctrlWrapper;