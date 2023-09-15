import Joi from "joi";

const userSignupSchema = Joi.object({
    username: Joi.string().required(),
    email:Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
})

 const loginSignupSchema = Joi.object({
    email:Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()})


 const userRefreshTokenSchema = Joi.object({
    refreshToken:Joi.string().required(),
 })   
    export default { userSignupSchema, loginSignupSchema,userRefreshTokenSchema  };
