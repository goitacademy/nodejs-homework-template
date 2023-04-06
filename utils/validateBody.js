const { HttpError } = require("../helpers");

const validateBody = schema => {
    const func = async (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            console.log("error! --- ", error);
            // next(res.status(400).json({ "message": "missing fields"}));
            const missingField = error.message.replace("is required", "").trim();
            console.log("missingField! --- ", missingField);
            next(HttpError(400, `missing ${missingField} name field`));
        }
        next();
    }
    return func;
}

module.exports = validateBody;