import Joi from 'joi';

export const contactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
