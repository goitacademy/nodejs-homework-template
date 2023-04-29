const Joi = require('joi')

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
            message: "Помилка від Joi"
        })
    }

    next();

}

function validateLogin (req, res, next) {

    const {error} = loginSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: "Помилка від Joi"
        })
    }

    next();

}

module.exports = {
    validatePostData,
    validatePutData,
    validatePatchData,
    validateRegister,
    validateLogin,
}