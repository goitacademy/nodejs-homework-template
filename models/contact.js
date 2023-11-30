const { Schema, model } = require("mongoose");
const Joi = require("joi");

const MongooseError = require("../helpers/MongoosError");

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
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
}).messages({ "any.required": "missing required {#key} field" });

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({ "any.required": "missing field {#key}" });

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const schemas = {
  addSchema,
  putSchema,
  favoriteSchema,
};

contactSchema.post("save", MongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
