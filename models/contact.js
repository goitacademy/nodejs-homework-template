const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// const { MongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name must be exist"],
    },
    email: {
      type: String,
      required: [true, "email must be exist"],
    },
    phone: {
      type: String,
      required: [true, "phone must be exist"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// contactSchema.post("save", MongooseError);

// const addSchema = Joi.object({
//   name: Joi.string().trim().required(),
//   email: Joi.string().trim().email().required(),
//   phone: Joi.string().trim().required(),
//   favorite: Joi.boolean(),
// });

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// const schemas = {
//   addSchema,
//   updateFavoriteSchema,
// };

const Contact = model("contact", contactSchema);

// module.exports = {
//   Contact,
//     schemas,
// };

module.exports = Contact;
