const { Schema, model } = require("mongoose");
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
    favourite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const Contact = model("contact", contactSchema);

const objectStructure = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favourite: Joi.boolean(),
});

const updateFavouriteSchema = Joi.object({
  favourite: Joi.boolean().required(),
});
const schemas = { objectStructure, updateFavouriteSchema };

module.exports = {
  Contact,
  schemas,
};
