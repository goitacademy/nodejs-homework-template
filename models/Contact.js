import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

//======================= mongoose ===============================================
const nameRegex =
  /^[a-zA-Zа-яіїєА-ЯІЇЄ]+(([' \-][a-zA-Zа-яіїєА-ЯІЇЄ])?[a-zA-Zа-яіїєА-ЯІЇЄ]*)*$/;

const emailRegex =
  /^([0-9A-Za-z]{1}([-_\.]?[0-9A-Za-z]+)*)@(([0-9A-Za-z]{1}([-_]?[0-9A-Za-z]+)*\.){1,2}[A-Za-z]{2,})$/;

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: nameRegex,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      match: emailRegex,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
//===========================================================================
contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

//========================================== Joi ============================

const messagesRequiredErrors = {
  "string.empty": "missing required {#label} field",
  "any.required": "missing required {#label} field",
};

const messagesNameErrors = {
  "string.pattern.base": "Field {#label} contains invalid characters",
};

const messagesPhoneErrors = {
  "string.pattern.base": "Field {#label} must be in the format (XXX) XXX-XXXX",
};

export const contactSchemeRequired = Joi.object({
  name: Joi.string().required().messages(messagesRequiredErrors),
  email: Joi.string().required().messages(messagesRequiredErrors),
  phone: Joi.string().required().messages(messagesRequiredErrors),
});
//=======================================================================
export const contactSchemeValues = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(
      new RegExp(
        /^[a-zA-Zа-яіїєА-ЯІЇЄ]+(([' \-][a-zA-Zа-яіїєА-ЯІЇЄ ])?[a-zA-Zа-яіїєА-ЯІЇЄ]*)*$/
      )
    )
    .messages(messagesNameErrors),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .pattern(new RegExp(/^\(\d{3}\) \d{3}-\d{4}$/))
    .messages(messagesPhoneErrors),
});
//============================================================================
// клас
const Contact = model("contact", contactSchema);

export default Contact;
