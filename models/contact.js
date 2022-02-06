const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, "Set name for contact"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const joiContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiContactSchema,
  favoriteJoiSchema,
};
