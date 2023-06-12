const Joi = require("joi");

// const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userRegisterSchema = Joi.object({
    // email: Joi.string().pattern(emailRegex).required(),
    email: Joi.string().required(),
    password: Joi.string().min(4).required()
});

const userLoginSchema = Joi.object({
    // email: Joi.string().pattern(emailRegex).required(),
    email: Joi.string().required(),
    password: Joi.string().min(4).required()
});

const resendVerificationLinkSchema = Joi.object({
    email: Joi.string().required()
})

module.exports = {
   userRegisterSchema,
   userLoginSchema,
   resendVerificationLinkSchema
}