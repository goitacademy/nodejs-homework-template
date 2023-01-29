const { HttpError } = require('../models/helpers/index');
const isValidId = require('./isValidId');

function validateBody(schema) {
    
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        console.log("error Validate:", error);
        if(error) {
            return next(new HttpError(400, error.message));
        }
        return next();
    }; 
}

module.exports = {
    validateBody,
    isValidId,
}