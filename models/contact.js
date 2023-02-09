const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = Schema(
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
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);
const Contact = model("contact", contactSchema);



const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().default(false),
});

const contactSchemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});
const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  Contact,
  contactSchemaUpdate,
  favoriteSchema,
  contactJoiSchema
};
