const { Schema, model } = require("mongoose");
const Joi = require("joi");

const hendleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      //   match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    },
    phone: {
      type: String,
      //   match: /^[\d()+\- ]+$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", hendleMongooseError);

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
  phone: Joi.string()
    .required()
    .pattern(/^[\d()+\- ]+$/),
  favorite: Joi.boolean(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  contactAddSchema,
};
