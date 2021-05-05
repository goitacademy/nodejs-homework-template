const Joi = require('joi')
const { subscriptions } = require('../../helpers/subscriptions')

const signupUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
})

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

const updateSubUser = Joi.object({
  subscription: Joi.string()
    .valid(subscriptions.STARTER, subscriptions.PRO, subscriptions.BUSINESS)
    .required()
})


const validation = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj);
        return next()
}
    catch (err) {
        next({
            status: 400,
            message: err.message
        })
 }
}

const validateSignupUser = (req, res, next) => {
  validation(signupUserSchema, req.body, next)
}

const validateLoginUser = (req, res, next) => {
  validation(loginUserSchema, req.body, next)
}

const validateUpdateSubUser = (req, res, next) => {
  validation(updateSubUser, req.body, next)
}
module.exports = {
  validateSignupUser,
  validateLoginUser,
  validateUpdateSubUser
}