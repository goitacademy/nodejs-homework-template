const { Schema, model } = require("mongoose");
const Joi = require("joi");

const hendleMongooseError = require("../helpers/handleMongooseError");
const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
    },
    phone: {
      type: String,
      match: /^[\d()+\- ]+$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", hendleMongooseError);

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegexp),
  phone: Joi.string()
    .required()
    .pattern(/^[\d()+\- ]+$/),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  contactAddSchema,
  updateFavoriteSchema,
};
