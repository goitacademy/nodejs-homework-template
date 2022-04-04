const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactShema = new Schema(
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

const joiScemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
});

const joiScemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool(),
});

// const joiSchemaUpdateContactStatus = Joi.object({
//   favorite: Joi.bool(),
// });

const Contact = model("contact", contactShema);

module.exports = {
  Contact,
  joiScemaCreateContact,
  joiScemaUpdateContact,
  //   joiSchemaUpdateContactStatus,
};
