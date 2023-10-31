const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const phoneRegex = /^\d{3}-\d{3}-\d{2}-\d{2}$/;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String, required: true },
    phone: { type: String, match: phoneRegex, required: true },
    favorite: { type: Boolean, default: true },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.boolean().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field "favorite"`,
    "favorite.empty": `"favorite" cannot be empty`,
    "favorite.base": `"favorite" must be boolean`,
  }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
