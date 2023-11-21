const errorMongo = (ctrl) => {
    const func = async(err, data, next) => {
        try {
            await ctrl(err, data, next);
        } catch (error) {
            next(error);
        }
    };
    return func;
};

module.exports = errorMongo;