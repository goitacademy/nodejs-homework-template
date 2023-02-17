const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "Set contact email"],
      match: [emailRegexp, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: true,
      unique: [true, "Phone must be unique"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiPostSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().min(3).max(20).required(),
  favorite: Joi.bool(),
  owner: Joi.string(),
});

const joiPutSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  email: Joi.string().pattern(emailRegexp).optional(),
  phone: Joi.string().min(3).max(20).optional(),
  favorite: Joi.bool(),
});

const joiPatchSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiPostSchema, joiPutSchema, joiPatchSchema };
