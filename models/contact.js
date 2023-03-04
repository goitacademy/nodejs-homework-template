const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
console.log(Schema);

const contactSchema = new Schema(
  //опис об'єкту (назва поля : вимога)
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
const addSchemaforPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const addSchemaforPut = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const addSchemaForFavorite = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  addSchemaforPost,
  addSchemaforPut,
  contactSchema,
  addSchemaForFavorite,
};
const Contact = model("contact", contactSchema);
contactSchema.post("save", handleMongooseError);

module.exports = {
  Contact,
  schemas,
};
