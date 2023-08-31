const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactList = [
  "Allen Raymond",
  "nulla.ante@vestibul.co.uk",
  "(992) 914-3792",
];

const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

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
    date: {
      type: String,
      match: dateRegexp,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .valid(...contactList)
    .required(),
  favorite: Joi.boolean(),

  date: Joi.string().pattern(dateRegexp).required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
  schemas,
};
