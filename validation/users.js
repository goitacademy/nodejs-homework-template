const Joi = require('joi');
const {HttpCode} = require('../helpers/constans')

const schemaRegLogin = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    repeat_password: Joi.ref('password'),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})


    
const validate = (schema, body, next) => {
    const {error}  = schema.validate(body)
    if (error) {
        const [{message}] = error.details
        return next({
            status: HttpCode.BAD_REQUEST,
            message,
            data: 'Bad Request'
        })
    }  
    next()
}

module.exports.validateRegLoginUser = (req, res, next) => {
    return validate(schemaRegLogin, req.body, next)
} 
