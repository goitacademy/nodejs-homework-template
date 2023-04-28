const Joi = require("joi");

const userRegisterSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})


module.exports= {
    userRegisterSchema,
    userLoginSchema,
}