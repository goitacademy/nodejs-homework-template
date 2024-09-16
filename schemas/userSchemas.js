import Joi from "joi";
import { emailRegexp, subscriptionList } from "../constans/index.js";
import { customMessages, emailPaternMessage } from "./schemaConstans.js";

export const joiUserSchemas = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .message(emailPaternMessage)
    .required(),
  subscription: Joi.string().valid(...subscriptionList),
}).messages(customMessages);

export const joiUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
}).messages(customMessages);
