const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^\d+$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().regex(/^\d+$/).required(),
    favorite: Joi.boolean()
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})
const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};
