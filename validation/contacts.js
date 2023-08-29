const Joi = require("joi");
const { Schema, default: mongoose } = require("mongoose");

const mongooseContactSchema = new Schema(
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
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
  phone: Joi.string()
    .min(0)
    .max(15)
    .pattern(/^[0-9]+$/)
    .required(),
});

const joiToggleFavouriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  mongooseContactSchema,
  joiContactSchema,
  joiToggleFavouriteContactSchema,
};