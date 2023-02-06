const Joi = require("joi");

const addContactsSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
      "any.required":"you should provide title!!"
    }),
  });

module.export = {
  addContactsSchema,
}
