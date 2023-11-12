const joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const contactsSchema = new Schema(
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
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
contactsSchema.post("save", handleMongooseError);
const Contact = model("contact", contactsSchema);
const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const patchSchema = joi.object({
  favorite: joi.boolean().required(),
});

module.exports = { Contact, addSchema, patchSchema };
