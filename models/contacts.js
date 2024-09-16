const listContacts = async () => {};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

import { Schema, model } from "mongoose";
import { VALIDATION } from "../constants/index.js";
import { format } from "../helpers/utils.js";
import * as hook from "./hooks.js";

const docShape = Object.entries(VALIDATION).reduce(
  (res, [fieldName, { pattern, message }]) => {
    res[fieldName] = {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => pattern.test(v),
        message,
      },
    };
    return res;
  },
  {
    favorite: {
      type: Boolean,
      default: false,
    },
  }
);

const { email, phone } = docShape;
email.unique = phone.unique = true;

const contactSchema = new Schema(docShape, {
  versionKey: false,
  timestamps: true,
});

contactSchema.pre("findOneAndUpdate", hook.handlePreUpdateValidate);

contactSchema.pre("save", hook.handlePreSaveFormatting);

contactSchema.post("findOneAndUpdate", hook.handlePostSaveError);
contactSchema.post("save", hook.handlePostSaveError);

export const Contact = model("contact", contactSchema);

