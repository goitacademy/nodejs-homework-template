const { Schema, model } = require("mongoose");

// const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// const postJoiContactSchema = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string()
//     .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
//     .required(),
//   favorite: Joi.boolean(),
// });

// const putJoiContactSchema = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).optional(),
//   email: Joi.string().email().optional(),
//   phone: Joi.string()
//     .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
//     .optional(),
//   favorite: Joi.boolean(),
// });

// const favoriteJoiSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  // postJoiContactSchema,
  // putJoiContactSchema,
  // favoriteJoiSchema,
};
