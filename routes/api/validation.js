const Joi = require('joi')

const schemaContact = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    email: Joi.string().min(1).max(100).required(),
    phone: Joi.string().min(10).max(20).required(),
    favorite: Joi.boolean()
})

const schemaId = Joi.object({
    contactId: Joi.string().required()
})

const schemaFavorite = Joi.object({
    favorite: Joi.boolean().required()
})

const emailRegexp = /[a-z0-9]+@([a-z]+\.)+[a-z]{2,3}/

const authSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})


const validate = async (schema, obj, res, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    }
    catch (err) { 
        console.log(err)  
        res.status(400).json({status: 'error', code: 400, message: err.message })
    }
}

module.exports.validateContact = async (req, res, next) => {
    return await validate(schemaContact, req.body, res, next)
}

module.exports.validateId = async (req, res, next) => {
    return await validate(schemaId, req.params, res, next)
}

module.exports.validateFavorite = async (req, res, next) => {
    return await validate(schemaFavorite, req.body, res, next)
}

module.exports.validateUser = async (req, res, next) => {
    return await validate(authSchema, req.body, res, next)
}

module.exports.validateEmail = async (req, res, next) => {
    return await validate(emailSchema, req.body, res, next)
}
