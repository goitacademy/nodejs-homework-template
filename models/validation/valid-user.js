const Joi = require('joi')

const typeSubscription = ["starter", "pro", "business"]

const userSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    password: Joi.string().required().min(7).max(15),

    subscription: Joi.string().optional(),

    avatarURL: Joi.string().required()
})

const subscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...typeSubscription)
        .required(),
});

module.exports = {
    userSchema,
    subscriptionSchema
}