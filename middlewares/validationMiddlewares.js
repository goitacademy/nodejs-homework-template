const Joi = require("joi")

const addContactValidation = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().min(4).max(30).required(),
        phone: Joi.string().pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).min(9).max(21).required(),
    });

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
        return res.status(400).json({
            status: validationResult.error.message
        })
    }
    next();
}
const putContactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).optional(),
        email: Joi.string().email().min(4).max(30).optional(),
        phone: Joi.string().pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).min(9).max(18).optional(),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
        return res
            .status(400)
            .json({ status: validationResult.error.details.message.status })
    }
    next()
}
module.exports = { addContactValidation, putContactValidation }