const { Schema, model } = require("mongoose");

const { mongooseError } = require("../helpers");

const Joi = require("joi");

const contactSchema = new Schema(
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", mongooseError);

const Contact = model("contact", contactSchema);

const primary = Joi.object({
  name: Joi.string().min(1).max(50).trim(),
  phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .min(10)
    .max(15),
  email: Joi.string().email(),
  favorite: Joi.boolean().default(false),
});

const secondary = Joi.object({
  favorite: Joi.boolean().default(false).required(),
}).min(1);
const schemas = {
  secondary,
  primary,
};

module.exports = {
  Contact,
  schemas,
};
