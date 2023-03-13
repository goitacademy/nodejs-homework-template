const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error) {
            error.status = 400
            console.log(req.body)
            next(error)
            return
        }
        next()
    }
}

module.exports = validation