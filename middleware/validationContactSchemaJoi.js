const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});

const favoriteJoiSchema = Joi.object({

    favorite: Joi.boolean().required()
});
module.exports = {
    addSchema,
    favoriteJoiSchema
}

const addValidationContacts = (req, res, next) => {
    const addSchema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        phone: Joi.string().required(),
        favorite: Joi.boolean()
    });

    const validationSchemaJoi = addSchema.validate(req.body);
    if (validationSchemaJoi.error) {
        return res.status(404).json({ status: validationSchemaJoi.error.message });
    }

    next();
};

const validateToggleFavorite = (req, res, next) => {
    const addSchema = Joi.object({

        favorite: Joi.boolean().required()
    });

    const validationSchemaJoi = addSchema.validate(req.body);
    if (validationSchemaJoi.error) {
        return res.status(400).json({ message: "missing field favorite" });
    }

    next();
};

module.exports = {
    addValidationContacts,
    validateToggleFavorite
}