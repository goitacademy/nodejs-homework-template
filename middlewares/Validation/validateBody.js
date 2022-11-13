
const { RequestError } = require("../../helpers/Errors");


const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw RequestError(error.message, 400)
        }
        next();
    }
}

module.exports = validateBody;
