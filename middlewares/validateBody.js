const { RequestError } = require("../helpers");
const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const validateBody = () => {
    const func = async (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) next(RequestError(400, error.message));
        next();
    };

    return func;
};

module.exports = validateBody;
