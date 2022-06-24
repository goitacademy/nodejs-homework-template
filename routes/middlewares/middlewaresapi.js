const joi = require("joi");

const addValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(20).required(),
        email: joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        phone: joi.string().min(6).max(15).required(),
    });
    const resultValidation = schema.validate(req.body);
    console.log(resultValidation.error);
    if (resultValidation.error) {
        return res.status(400).json({ message: "No validate", response: null });
    }
    next();
};

const updateValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(20).required(),
        email: joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        phone: joi.string().min(6).max(15).required(),
    });
    const resultValidation = schema.validate(req.body);
    if (resultValidation.error) {
        return res.status(400).json({ message: "No validate", response: null });
    }
    next();
};

module.exports = {
    addValidation,
    updateValidation,
};
