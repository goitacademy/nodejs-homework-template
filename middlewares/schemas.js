import Joi from 'joi';

export const schemas = {
  updateContact: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().lowercase().required(),
    // phone: Joi.string().min(5).max(17).required(),
    phone: Joi.string()
      .pattern(
        /^\+?(\d{10,12}|(38|)(\s?(\(\d{3}\)\s?|\d{3}\s)(\d{7}|\d{3}(\s|-)\d{2}(\s|-)?\d{2})))$/
      )
      .required(),
  }),
};
