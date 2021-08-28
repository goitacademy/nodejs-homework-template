const { Schema, model } = require("mongoose");
// const Joi = require("joi");
const joiSchema = require("../validation");

const emailmask =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phonemask = /^s?[(][0-9]{3}[)][^0-9][0-9]{3}-[0-9]{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      // match: emailmask,
    },
    phone: {
      type: String,
      // match: phonemask,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);



const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema};
