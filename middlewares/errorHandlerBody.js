const { schemaValidate } = require('../service/schemas/contactsValidate');


const validateRequestBody = (req, res, next) => {
    const { error } = schemaValidate.validate(req.body);
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Missing fields"
        });
    }
    if (error && req.method.toLowerCase() !== 'patch') {
        const missingField = error.details[0].context.label;
        return res.status(400).json({
            message: `Missing required ${missingField} field`
        });
    }
    next();
};


module.exports = validateRequestBody;