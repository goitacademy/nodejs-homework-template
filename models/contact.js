// ------------------------------------------------------------------------
//                         Model
//-------------------------------------------------------------------------

const { model, Schema } = require("mongoose");
const joi = require("joi");

// ------- Model Schema ----------------
const ContactSchema = new Schema(
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

// ------ JOI SCHEMA ------------------
const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const favoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

const schema = {
  addSchema,
  favoriteSchema,
};
// -------------------------------------

const Contact = model("contact", ContactSchema);

module.exports = {
  Contact,
  schema,
};
