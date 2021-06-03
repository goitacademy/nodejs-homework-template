const Joi = require('joi');
const {Subscription, HttpCode} = require("../../../helpers/constants");



const schemaUpdateSubscription = Joi.object({
    subscription: Joi.string()
         .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
        .required(),
});


const validate = async (schema, body, next) => {
    try {
        await schema.validateAsync(body);
        next();
    }
    catch (err) {
        next({ status: HttpCode.BAD_REQUEST, message: `Field: ${err.message.replace(/"/g, "")}`});
    };
};


module.exports.validateSubscription = (req, res, next) => {
    return validate(schemaUpdateSubscription, req.body, next);
};