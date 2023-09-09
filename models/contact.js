const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const contactSchema = new Schema(
    {
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
        required: true,
      },
    },
    { versionKey: false, timestamps: true }
  );

  contactSchema.post("save", handleMongooseError);

  const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  
  const updateStatusContactSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
      "boolean:base": `"favorite" should be a type "bool"`,
      "boolean.empty": `"favorite" cannot be empty`,
      "any.required": `"favorite" is a required field`,
    }),
  });
  
  const schemas = { addSchema, updateStatusContactSchema };

  const Contact = model("contact", contactSchema);
  
  module.exports = { Contact, schemas };