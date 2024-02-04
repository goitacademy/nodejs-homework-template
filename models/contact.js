const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

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

  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const requiredFieldsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),

  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = {
  requiredFieldsSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
