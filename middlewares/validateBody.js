const {HttpError} = require("../helpers");
const isEmpty = require('lodash.isempty');

const validateBody = schema => {
    
    const func = (req, res, next)=> {
        console.log('validateBody');
        if(isEmpty(req.body)){
            console.log('isEmpty');
            throw HttpError(400, 'missing fields');
        }

        const { error } = schema.validate(req.body);
        console.log('validateBody error=', error.message);
        if (error) {
            next(HttpError(400, error.message));
            
        }
        next()
    }

    return func;
}

module.exports = validateBody;