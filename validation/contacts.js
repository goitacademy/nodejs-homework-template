// import joi from "joi";

// export const contactSchema = joi.object({
//   name: joi.string().min(2).required(),
//   email: joi.string().required(),
//   phone: joi.string().required(),
// });

// const contactValidator = (schema) => (data) => {
//   return schema.validate(data, { abortEarly: false });
// };

// export const contactValidate = contactValidator(contactSchema);

// import joi from "joi";

// export const contactSchema = joi.object({
//   name: joi.string().min(2).required(),
//   email: joi.string().required(),
//   phone: joi.string().required(),
// });

// const contactValidator = (schema) => (data) => {
//   return schema.validate(data, { abortEarly: false });
// };

// export const contactValidate = contactValidator(contactSchema);

// import joi from "joi";

// export const contactSchema = joi.object({
//   name: joi.string().min(2).required(),
//   email: joi.string().required(),
//   phone: joi.string().required(),
// });

// const contactValidator = (schema) => (data) => {
//   return schema.validate(data, { abortEarly: false });
// };

// export const contactValidate = contactValidator(contactSchema);

// import joi from "joi";

// export const contactSchema = joi.object({
//   name: joi.string().min(2).required(),
//   email: joi.string().required(),
//   phone: joi.string().required(),
// });

// const contactValidator = (schema) => (data) => {
//   return schema.validate(data, { abortEarly: false });
// };

// export const contactValidate = contactValidator(contactSchema);

// export const contactUpdateSchema = joi.object({

import joi from "joi";

export const contactSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const contactValidator = (schema) => (data) => {
  return schema.validate(data, { abortEarly: false });
};

export const contactValidate = contactValidator(contactSchema);
