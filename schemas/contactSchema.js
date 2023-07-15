import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name must be exist",
  }),
  email: Joi.string().required().messages({
    "any.required": "Email must be exist",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Phone must be exist",
  }),
});

export default contactSchema;

// ====================================
// const contactSchema = Joi.object({
// name: Joi.string().alphanum().required(),
// email: Joi.string()
//   .email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net"] },
//   })
//   .required(),
// phone: Joi.string().alphanum().required(),
//   });
