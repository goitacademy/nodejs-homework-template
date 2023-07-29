import Joi from "joi";

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
})
  .required()
  .min(1)
  .messages({
    "object.min": "Missing field subscription",
  });
export default {
  subscriptionSchema,
};
