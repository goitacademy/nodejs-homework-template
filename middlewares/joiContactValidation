const Joi = require("joi");

const { HttpError } = require("../helpers");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().required(),
});

const updateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

const add = (req, res, next) =>{
    const {error} = addSchema.validate(req.body);
    if (error) {
       throw HttpError(400, error.message)
    }
    next()
}

const update = (req, res, next) => {
    const {error} = updateSchema.validate(req.body);
    if (error) {
       throw HttpError(400, error.message)
    }
    next()
}

module.exports = {
    add,
    update,
};