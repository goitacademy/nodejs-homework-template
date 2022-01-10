import Joi from "joi";
import { Subscription } from '../../lib/constants'


const createSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  password: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS),
  token: Joi.string().token(),
})

 const subscriptionSchema = Joi.object({
   email: Joi.string().min(2).max(30),
   password: Joi.string().min(2).max(30).required(),
 })

const updateSubscriptionSchema = Joi.object({
  id: Joi.string().required(),
  subscription: Joi.string()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
    .required(),
})

const updateToken = Joi.object({
    token: Joi.string().token(),
  });

export const validatorCreate = async (req, res, next) => {
    try {
        await createSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({message: `Missing field ${err.message.replace(/"/g, '')} `})
    }
    next ()
}

export const validatorSubscription = async (req, res, next) => {
    try {
        await subscriptionSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(400).json({message: 'Missing fields'})
        }
        return res.status(400).json({message: err.message})
    }
    next ()
}

export const validatorUpdateSubscription = async (req, res, next) => {
    try {
        await updateSubscriptionSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(400).json({message: 'Missing fields'})
        }
        return res.status(400).json({message: err.message})
    }
    next ()
}

export const validatorToken = async (req, res, next) => {
    try {
        await updateToken.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(400).json({message: "Missing field favorite"})
        }
        return res.status(400).json({message: err.message})
    }
    next ()
}
