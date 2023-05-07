const Joi = require('joi')

const addSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`,
        "string.empty": `name cannot be empty`,
        "string.base": `name must be string`
    }),
    email: Joi.string().required().messages({
        "any.required": `missing required email field`,
        "string.empty": `email cannot be empty`,
        "string.base": `email must be string`
    }),
    phone: Joi.string().required().messages({
        "any.required": `missing required phone field`,
        "string.empty": `phone cannot be empty`,
        "string.base": `phone must be string`
    }),
    favorite: Joi.boolean(),
})

const putSchema = Joi.object().min(1)

const patchSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const registerSchema = Joi.object({
    email: Joi.string().required().messages({
        "any.required": `missing required email field`,
        "string.empty": `email cannot be empty`,
        "string.base": `email must be string`
    }),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().required().messages({
        "any.required": `missing required email field`,
        "string.empty": `email cannot be empty`,
        "string.base": `email must be string`
    }),
    password: Joi.string().min(6).required(),
});

const verifySchema = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": `missing required email field`,
    }),
});


const updSubscriptSchema = Joi.object({
    subscription: Joi.any().valid('starter', 'pro', 'business').required(),
}).required();

function validatePostData (req, res, next) {

    const {error} = addSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: error.message,
        })
    }

    next();

}

function validatePutData (req, res, next) {

    const {error} = putSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: "missing fields"
        })
    }

    next();

}

function validatePatchData (req, res, next) {

    const {error} = patchSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: "missing field favorite"
        })
    }

    next();

}

function validateRegister (req, res, next) {

    const {error} = registerSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: error.message,
        })
    }

    next();

}

function validateLogin (req, res, next) {

    const {error} = loginSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: error.message,
        })
    }

    next();

}

function validateEmail (req, res, next) {

    const {error} = verifySchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: error.message,
        })
    }

    next();

}

function validateUpdSubscrip (req, res, next) {

    const {error} = updSubscriptSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            message: error.message,
        })
    };

    next();

};

module.exports = {
    validatePostData,
    validatePutData,
    validatePatchData,
    validateRegister,
    validateLogin,
    validateEmail,
    validateUpdSubscrip,
}