const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");

const nameRegex = "^[A-Z][a-z]+ [A-Z][a-z]+$";
const phoneRegex = "^[0-9]{3}-[0-9]{3}-[0-9]{4}$";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [40, "Name can be up to 40 characters long"],
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

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().pattern(new RegExp(nameRegex)).required().messages({
    "any.required": `Missing required name field`,
  }),

  email: Joi.string().required().messages({
    "any.required": `Missing required email field`,
  }),

  phone: Joi.string().pattern(new RegExp(phoneRegex)).required().messages({
    "any.required": `Missing required phone field`,
  }),

  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": `Missing field favorite` }),
});

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
  addSchema,
  updateFavoriteSchema,
};
