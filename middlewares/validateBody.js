const { HttpError } = require("../helpers/index");


const validateBody = contactSchema  => {
    const func = (req, res, next) => {
        if (!Object.keys(req.body).length) {
            next (HttpError(400, "All fields are empty"));
        };
    
        const { error } = contactSchema.validate(req.body);
        
        if (error) {
            next (HttpError(400, error.message));
        };
        next()
    }
    return func;
};


module.exports = validateBody;



