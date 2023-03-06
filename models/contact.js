const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMangooseError } = require("../utils");

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
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMangooseError);

const ContactLeaveSchema = model("contact", contactSchema);

module.exports = ContactLeaveSchema;
