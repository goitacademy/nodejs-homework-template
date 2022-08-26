const {RequestErr} = require("../helpers");

const validationBody = schema => {
    const func = async(req, _, next) => {
        const {error} = schema.validate(req.body);
        if(error) {
            next(RequestErr(400, error.message));
        }
        next();
    }

    return func;
}

module.exports = validationBody;