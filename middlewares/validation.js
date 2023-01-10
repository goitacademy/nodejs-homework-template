const getError = require("../routes/error/error")
const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw getError(400, "missing required name field");
        }
        next()
    }
}

module.exports = validation