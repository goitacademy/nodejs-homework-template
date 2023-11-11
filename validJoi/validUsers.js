const Joi = require("joi");

const authUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
}).required();

const upUserSubscription = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
    authUser,
    upUserSubscription,
};