const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Joi = require("joi");
const JoiPhoneValidate = Joi.extend(require("joi-phone-number"));

const Shema = mongoose.Schema;

const contactSchema = new Shema(
  {
    name: {
      type: String,
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
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model("Contact", contactSchema);

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const contactCreateValidationShema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: JoiPhoneValidate.string()
    .phoneNumber({ defaultCountry: "PL", format: "international" })
    .required(),
  favorite: Joi.boolean(),
});

const contactUpdateValidationShema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: JoiPhoneValidate.string()
    .phoneNumber({
      defaultCountry: "PL",
      format: "international",
    })
    .required(),
  favorite: Joi.boolean().required(),
});

const contactUpdateStatusValidationShema = Joi.object({
  favorite: Joi.boolean().required(),
});

const idShema = Joi.object({
  contactId: Joi.string().alphanum().length(24),
});

const validateCreateContact = validator(contactCreateValidationShema);
const validateUpdateContact = validator(contactUpdateValidationShema);
const validateUpdateStatusContact = validator(
  contactUpdateStatusValidationShema
);
const validateIdContact = validator(idShema);

module.exports = {
  Contact,
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  validateIdContact,
};