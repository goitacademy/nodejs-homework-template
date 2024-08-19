import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().min(1).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^\+?[0-9\s\-\(\)\.\x{2E}]+$/)
    .optional(),
});
