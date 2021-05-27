const Joi = require('joi');

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    email: Joi.string()
        .min(4)
        .max(30)
        .optional(),
    phone: Joi.number()
        .min(10)
        .max(15)
        .optional(),
    inFavorites: Joi.boolean()
        .optional(),
});

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .optional(),
    email: Joi.string()
        .alphanum()
        .min(4)
        .max(30)
        .optional(),
    phone: Joi.number()
        .min(10)
        .max(15)
        .optional(),
    inFavorites: Joi.boolean()
        .optional(),
});

const schemaUpdateFavouriteContact = Joi.object({
    inFavorites: Joi.boolean()
        .required(),
});


const validate = async (schema, body, next) => {
    try {
        await schema.validateAsync(body);
        next();
    }
    catch (err) {
        next({ status: 400, message: `Field: ${err.message.replace(/"/g, "")}`});
    };
};

module.exports.validateCreateContact = (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
}

module.exports.validateUpdateContact = (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
}

module.exports.validateUpdateFavouriteContact = (req, res, next) => {
    return validate(schemaUpdateFavouriteContact, req.body, next);
}