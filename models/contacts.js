const { Schema, model } = require("mongoose");

const Joi = require("joi");

const handlerSchemaValidatonErrors = require("../middlewares/handlerSchemaValidatonErrors");

///contacts schema
const emailReg =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const phoneReg = /^\(\d{3}\) \d{3}-\d{4}/;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "the name must contain at least three letters"],
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      minLength: 8,
      match: [emailReg, "email has formats like: email@email.com"],
      required: true,
    },
    phone: {
      type: String,
      minLength: 14,
      maxLength: 14,
      required: true,
      match: [phoneReg, "write down the phone in the format (999) 999-9999"],
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

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(8).required().pattern(emailReg),
  phone: Joi.string().min(14).max(14).required().pattern(phoneReg),
  favorite: Joi.bool(),
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

//error function
contactSchema.post("save", handlerSchemaValidatonErrors);

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, joiFavoriteSchema };
