// const fs = require("fs/promises");
// const path = require("path");

// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "../models/contacts.json");

// const listContacts = async () => {
//   const result = await fs.readFile(contactsPath, "utf-8");
//   return JSON.parse(result);
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const result = contacts.find((item) => item.id === contactId);
//   return result || null;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }

//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// };

// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...body,
//   };
//   contacts.push(newContact);

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }

//   const updatedContact = { ...contacts[index], ...body };
//   contacts.splice(index, 1, updatedContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return updatedContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set e-mail for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const schemaJoi = Joi.object({
  name: Joi.string().min(1).max(25).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .min(3)
    .trim()
    .max(15)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.pattern.base": `Phone number can contain from 3 to 15 digits.`,
    })
    .required(),
  favorite: Joi.bool(),
});

const updatefavoriteSchema = Joi.object({
  favorite: Joi.bool(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemaJoi, updatefavoriteSchema };
