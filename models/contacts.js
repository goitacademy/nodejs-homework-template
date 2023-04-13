const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../utils");

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
  }, {versionKey: false, timestamps: false});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `"name" is required`,
      "string.empty": `"name" cannot be empty`,
      "string.base": `"name" must be string`,
    }),
    email: Joi.string().required().messages({
      "any.required": `"email" is required`,
      "string.empty": `"email" cannot be empty`,
      "string.base": `"email" must be string`,
    }),
    phone: Joi.string().required().messages({
      "any.required": `"phone" is required`,
      "string.empty": `"phone" cannot be empty`,
      "string.base": `"phone" must be string`,
    }),
    // Joi.string().pattern(//)
  });

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
}