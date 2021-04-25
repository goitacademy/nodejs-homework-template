const wrap = (fn) => async (req, res, next) => {
    try {
        const result = await fn(req, res, next)
        return result
    } catch (error) {
        if (error.name === 'ValidationError') {
               err.status = 400
             }
             next(err)
    }
}

module.exports = wrap