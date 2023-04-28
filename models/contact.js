const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// const contactSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, 'name must be exist'],
//   },
//   email: { type: String, required: [true, 'email must be exist'],},
//   phone: { type: String, required: [true, 'phone must be exist'], },
//   favorite: {
//     type: Boolean,
//     default: false,
//   },
// });

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: emailRegexp,
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
});

contactSchema.post("save", handleMongooseError);

const updateFavoritSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ message: "missing field favorite" }),
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemas = {
  addSchema,
  updateFavoritSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
