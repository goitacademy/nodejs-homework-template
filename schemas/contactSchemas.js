import Joi from "joi";
import { customMessages } from "./schemaConstans.js";

export const addSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
}).messages(customMessages);

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages(customMessages);
