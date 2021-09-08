const { Schema } = require("mongoose");
const Joi = require("joi");

const emailSchema = require("./email");

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name must exist!"],
    },
    email: emailSchema,
    phone: {
      type: String,
      required: true,
      unique: true,
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

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(new RegExp(emailRegexp)),
  phone: Joi.string().required(),
});

module.exports = { contactSchema, joiSchema };
