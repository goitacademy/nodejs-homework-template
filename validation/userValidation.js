const Joi = require('joi');
const mongoose = require('mongoose');
const { Subscription } = require('../helpers/constants');

const passwordRegExp = '^[-\\.\\$\\#\\w]*$';
const nameRegExp = '^[-\\s\\.A-Za-z]*$';

const schemaUser = Joi.object({

    name: Joi.string()
        .pattern(new RegExp(nameRegExp))
        .min(1)
        .max(30),

    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: true } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp(passwordRegExp))
        .min(1)
        .max(30)
        .required(),

    subscription: Joi.string().lowercase()
        .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
        .optional(),

    token: Joi.string()
        .token()
        .optional(),

})
    .with('email', 'password');

const schemaUpdateUserSubscription = Joi.object({
    subscription: Joi.string().lowercase()
        .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
        .required()
});

const isMongoIdValid = (req, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
        return next({
            status: 400,
            message: 'Invalid ObjectId',
        });
    };
    next();
};

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj);
        next();
    }
    catch (err) {
        next({
            status: 400,
            message: err.message.replace(/"/g, '')
        });
    };
};

module.exports = {
    validateUser: (req, res, next) => validate(schemaUser, req.body, next),
    validateUpdateUserSubscription: (req, res, next) => validate(schemaUpdateUserSubscription, req.body, next),
    validateMongoId: (req, res, next) => isMongoIdValid(req, next)
};