const {HttpError} = require("../helpers");

const validateAddContact = schema => {
    const func = (req, res, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    }

    return func;
}

const validateUpdateContact = schema => {
    const func = (req, res, next)=> {
        // const { error } = schema.validate(req.body);
       if (JSON.stringify(req.body) === "{}") {
        throw HttpError (400, "Missing fields")
       }
        next();
    }

    return func;
}


module.exports = {
    validateAddContact,
    validateUpdateContact 
};