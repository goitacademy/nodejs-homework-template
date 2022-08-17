// обгортка для універсальної заміни try catch контролерів (controllers)

const ctrlWrapper = (ctrl) => {
    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error);
        }
    };

    return func;
};

module.exports = ctrlWrapper;

