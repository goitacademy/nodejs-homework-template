const {RequestError} = require("../helpers");

const validationBody = schema => {
    const func = async (req, _, next) => {
        try {
            const { error } = schema.validate(req.body);
            if (error) {
                next(RequestError(400, error.message));
            }
        }
        catch{ next();}
       next();
    }
    
    return func;
}

module.exports = validationBody;