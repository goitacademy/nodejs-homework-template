const { Schema, model } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const phoneRegexp = /^\(\d{3}\)\s\d{3}-\d{4}$/;
const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please, set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Please, set email for contact"],
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: [true, "Please, set phone for contact"],
      match: [phoneRegexp, "Must be in format (000) 000-0000"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp, "numbers").required(),
  favorite: Joi.boolean().default(false),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required().error(new Error("Missing field favorite")),
});

const verifyMongoIdSchema = Joi.object({
  id: Joi.objectId().required().error(new Error("Please, enter correct id")),
});

const schemas = {
  add: addSchema,
  updateStatus: updateStatusSchema,
  verifyMongoId: verifyMongoIdSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
