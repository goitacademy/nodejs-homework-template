const Joi = require('joi')
// const {HttpError} = require("../helpers")

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
})

const putSchema = Joi.object().min(1)

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

module.exports = {
    validatePostData,
    validatePutData
}