const contactAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"title" required field`,
  }),
  director: Joi.string().required(),
});
