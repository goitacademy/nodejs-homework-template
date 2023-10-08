import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

//================================================================================
const contactShemaValidation = {
  name: {
    regExp:
      /^[a-zA-Zа-яіїєА-ЯІЇЄ]+(([' \-][a-zA-Zа-яіїєА-ЯІЇЄ])?[a-zA-Zа-яіїєА-ЯІЇЄ]*)*$/,
    errorMessage: "Field name contains invalid characters",
  },
  email: {
    regExp:
      /^([0-9A-Za-z]{1}([-_\.]?[0-9A-Za-z]+)*)@(([0-9A-Za-z]{1}([-_]?[0-9A-Za-z]+)*\.){1,2}[A-Za-z]{2,})$/,
    errorMessage: "Field email must be a valid email",
  },
  phone: {
    regExp: /^\(\d{3}\) \d{3}-\d{4}$/,
    errorMessage: "Field phone must be in the format (XXX) XXX-XXXX",
  },
};

const addFieldMongoose = (fieldName) => {
  const { regExp, errorMessage } = contactShemaValidation[fieldName];
  return {
    type: String,
    match: [regExp, errorMessage],
    required: [true, "Set {PATH} for contact"],
  };
};

const messagesErrorsJoi = (message) => {
  return {
    "string.empty": "missing required {#label} field",
    "any.required": "missing required {#label} field",
    "string.pattern.base": message,
  };
};

function addFieldJoi(fieldName) {
  const { regExp, errorMessage } = contactShemaValidation[fieldName];
  return this.string()
    .required()
    .pattern(new RegExp(regExp))
    .messages(messagesErrorsJoi(errorMessage));
}

const messagesFavoriteErrors = {
  "string.empty": "missing field {#label}",
  "any.required": "missing field {#label}",
};
//======================= mongoose ===============================================
const contactSchema = new Schema(
  {
    name: { ...addFieldMongoose("name"), minlength: 3 },
    email: addFieldMongoose("email"),
    phone: addFieldMongoose("phone"),
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);
//===========================Joi ================================================

export const contactSchemeValues = Joi.object({
  name: addFieldJoi.call(Joi, "name").min(3),
  email: addFieldJoi.call(Joi, "email"),
  phone: addFieldJoi.call(Joi, "phone"),
  favorite: Joi.bool(),
});

export const contactSchemaFavorite = Joi.object({
  favorite: Joi.bool().required().messages(messagesFavoriteErrors),
});

export default Contact;
