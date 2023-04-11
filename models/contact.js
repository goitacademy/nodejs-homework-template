const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { MongooseError } = require("../helpers");

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
  },
  { versionKey: false }
);

//  timestamps: true;

contactSchema.post("save", MongooseError);

const addSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().required(),
  favorite: Joi.boolean(),
});

const addSchemaUpd = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().trim().email(),
  phone: Joi.string().trim(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  addSchemaUpd,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
