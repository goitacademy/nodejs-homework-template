const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleDbSchemaError } = require("../helpers");

const contactDbSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: [true, " name must be unique"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
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

contactDbSchema.post("save", handleDbSchemaError);

const Contact = model("contact", contactDbSchema);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const joiSchemaFavorite = Joi.object({
  favorite: Joi.boolean().required().messages({
    message: "Should be email!",
  }),
});

module.exports = {
  Contact,
  joiSchema,
  joiSchemaFavorite,
};
