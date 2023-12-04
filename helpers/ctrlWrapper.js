const ctrlWrapper = ctrl => {
    const wrapperFunc = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error);
        }
    };
    return wrapperFunc;
};

module.exports = ctrlWrapper;
