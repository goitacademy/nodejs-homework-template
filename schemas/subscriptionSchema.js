import Joi from "joi";

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
}) 

export default subscriptionSchema;