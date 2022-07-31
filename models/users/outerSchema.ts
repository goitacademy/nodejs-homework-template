import Joi, { string } from 'joi';
import { TUser } from './typesTS';
import { userSubscription } from './userSubscription';

const passwordSchema = Joi.object({
    password: Joi.string()
        .required()
        .error(() => 'Password is required')
})

const validatePassword =
    (password: string) => passwordSchema.validate(password);

const emailSchema = Joi.object({
    email: Joi.string()
        .required()
        .error(() => 'Email is required')
})

const validateEmail = (email: string) =>
    emailSchema.validate(email);

const subscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...userSubscription)
        .default('starter')
})
const validateSubscription = (subscription: string) =>
    subscriptionSchema.validate(subscription);

const tokenSchema = Joi.object({
    token: Joi.string()
        .default(null)
})

const validateToken = (token: string) =>
    tokenSchema.validate(token);

const userSchema = Joi.object()
    .concat(passwordSchema)
    .concat(emailSchema)
    .concat(subscriptionSchema)
    .concat(tokenSchema)


const validateUser = (user: TUser) =>
    userSchema.validate(user);


const outerSchema = {
    validateEmail,
    validatePassword,
    validateSubscription,
    validateToken,
    validateUser
}
export default outerSchema;