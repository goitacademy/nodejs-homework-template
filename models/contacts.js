const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors, RequestError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleSaveErrors);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .error(() => {
      throw RequestError(400, "missing field favorite");
    }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
