import mongoose from "mongoose";
import Joi from "joi";

const { Schema, model } = mongoose;

const codeRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
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
  name: Joi.string().required(),
  phone: Joi.string().required().pattern(codeRegexp).messages({
    "string.pattern.base":
      "Phone number fails to match the required pattern: (123) 456-7890",
  }),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "com"] },
    }),
  favorite: Joi.bool(),
});

const statusJoiSchema = Joi.object({ favorite: Joi.bool().required() });

const Contact = model("contact", contactSchema);

const contactModel = {
  Contact,
  joiSchema,
  statusJoiSchema,
};

export default contactModel;
