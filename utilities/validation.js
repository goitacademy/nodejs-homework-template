const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^(\(\d{3}\)\s\d{3}-\d{4})$/).required()
});

const validate = (schema, obj, next, res) => {
    const { error } = schema.validate(obj);
    if (error) {
        const [{ message }] = error.details;
        console.log(error);
        return res.json({
            status: "failure",
            code: 400,
            message: `Field ${message.replace(/"/g, "")}`,
        });
    }
    next();
};

module.exports.contact = (req, res, next) => {
    return validate(schema, req.body, next, res);
};