const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(4).required(),
  favorite: Joi.bool(),
});

const handlerErrors = (error, data, next) => {
  console.log("handler working");
};

contactSchema.post("save", handlerErrors);

const schemas = {
  addSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
