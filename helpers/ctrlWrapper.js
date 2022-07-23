const ctrlWrapper = (ctrl) => {
    const errorCatchFunc = async(req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error);
        }
    }

    return errorCatchFunc;
}

module.exports = ctrlWrapper;