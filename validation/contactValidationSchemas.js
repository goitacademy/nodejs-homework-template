// export const contactSchemaJoi = joi.object({
//   name: joi.string().min(2).required(),
//   email: joi.string().pattern(emailRegexp).required().messages({
//     "string.pattern.base": "Email format must be - example@example.com",
//   }),
//   phone: joi.string().pattern(phoneRegex).required().messages({
//     "string.pattern.base": "Phone format must be - max 10 characters",
//   }),
//   favorite: joi.boolean().default(false),
// });

// const updateFavoriteSchema = joi.object({
//   favorite: joi.boolean().required(),
// });

// export const contactValidate = contactValidator(contactSchemaJoi);
// export const favoriteValidate = contactValidator(updateFavoriteSchema);

// export const Contact = model("contact", contactSchema);

// export const registerSchema = Joi.object({
//   email: Joi.string().pattern(emailRegexp).required().messages({
//     "string.pattern.base": "Email format must be - example@example.com",
//   }),
//   password: Joi.string().min(6).required(),
//   subscription: Joi.string().valid(...subscriptionList),
// });

// export const loginSchema = Joi.object({
//   email: Joi.string().pattern(emailRegexp).required(),
//   password: Joi.string().min(6).required(),
// });

// export const subscriprionSchema = Joi.object({
//   subscription: Joi.string().valid(...subscriptionList),
// });

// export const User = model("user", userSchema);
