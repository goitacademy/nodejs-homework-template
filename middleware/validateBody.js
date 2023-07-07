// const Joi = require("joi");
// const contactSchema = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .required()
//     .error(() => new Error("name")),
//   email: Joi.string()
//     .email()
//     .required()
//     .error(() => new Error("email")),
//   phone: Joi.string()
//     .min(10)
//     .max(15)
//     .required()
//     .error(() => new Error("phone")),
//   favorite: Joi.boolean(),
// });
const {contactSchema} = require('../models/joiSchemas')

const validateBody = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    // const [value] = error.message.match(/"\w*"/);
    // console.log(value);
    res
      .status(400)
      .json({ message: `missing required ${error.message} field` });
  } else {
    next();
  }
};

module.exports = validateBody;
