const HTTP_CODS = require("../helpers/httpCodes"); 

const validation = (schema) => {
    validFunc = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.
                status(HTTP_CODS.BAD_REQUEST)
                .json({
                    "message": "missing field favorite"
                });
        }
        next();
    }

    return validFunc;
};

module.exports = validation;
