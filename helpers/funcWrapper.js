const funcWrapper = func => {
    const wrapper = async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (error) {
            next(error)
        }
    }
    return wrapper
};

module.exports = funcWrapper