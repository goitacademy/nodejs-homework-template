const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name must exist"],
    },
    email: {
      type: String,
      required: [true, "name must exist"],
    },
    phone: {
      type: String,
      required: [true, "phone must exist"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});
const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().min(3).max(30).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });
const schemas = { addSchema, updateFavoriteSchema };
const Contact = model("contact", contactSchema);
module.exports = { Contact, schemas };
