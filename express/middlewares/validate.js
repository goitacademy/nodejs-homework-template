const ERROR_TYPES = require("../../constants/errors");
const createError = require("../../utils/createError");


const validate = (target) => (schema, message) => (req, res, next) => {
    const result = schema.validate(req[target]);
    if (result.error) {
        const error = createError(ERROR_TYPES.BAD_REQUEST, {
            data: result.error.details,
            message: result.error.message,
        });
        next(error);
    } else {
        next();
    }
};

module.exports = validate;

