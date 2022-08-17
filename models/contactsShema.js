const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
});
