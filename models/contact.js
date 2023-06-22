const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const bodyValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.string().min(5).max(15).required(),
    favorite: Joi.boolean(),
  });

  return schema.validate(data);
};

const favoriteValidator = (data) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  return schema.validate(data);
};

module.exports = { Contact, bodyValidator, favoriteValidator };
