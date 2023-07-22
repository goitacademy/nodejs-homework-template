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
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object()
  .keys({
    name: Joi.string().label("name").alphanum(),
    email: Joi.string().label("email").email(),
    phone: Joi.string().label("phone"),
    favorite: Joi.boolean().label("favorite"),
  })
  .min(3)
  .and("name", "email", "phone")
  .messages({
    "object.min": "missing fields ",
    "object.and": "missing required {#missingWithLabels} field ",
  });

const updateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  "any.required": "missing field favorite",
});

const schemas = {
  addSchema,
  updateStatusContact,
};

module.exports = {
  Contact,
  schemas,
};
