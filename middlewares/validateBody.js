const { RequestError } = require('../helpers');

const validateBody = (schema) => {
    const fm = (requirement, response, next) => {
        const validationResult = schema.validate(requirement.body);

        if (validationResult.error) {
            next(RequestError(404, "missing required name field"));
        }
        next();
    }
    return fm;
}

module.exports = validateBody;