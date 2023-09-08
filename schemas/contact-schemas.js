import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `"name" mast be exist` }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": `"email" mast be exist` }),
  phone: Joi.string()
    .required()
    .pattern(
      /^[(][0-9]{3}[)][\s][0-9]{3}-[0-9]{4}$/,
      `"Phone number must be type: "(***) ***-****""`
    )
    .messages({ "any.required": `"phone" mast be exist` }),
  favorite: Joi.boolean(),
});

export default contactAddSchema;
