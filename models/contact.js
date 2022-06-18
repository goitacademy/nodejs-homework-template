const { Schema, model } = require("mongoose");
const Joi = require("joi");

const joiShema = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),
  });
  const validationResult = schema.validate(data);
  return validationResult;
};

const favoriteJoiShema = (data) => {
  const schema = Joi.object({
    favorite: Joi.bool().required(),
  });
  const validationResult = schema.validate(data);
  return validationResult;
};
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
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiShema, favoriteJoiShema };
