const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("Joi");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
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
});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};

// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");
// const updateContacts = async (contacts) =>
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath);

//     return JSON.parse(data);

//   } catch (err) {
//     console.error("Error:", err);
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const resault = contacts.find((item) => item.id === `${contactId}`);

//     return resault || null;
//   } catch (err) {
//     console.error("Error:", err);
//   }
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === `${contactId}`);
//   if (index === -1) {
//     return null;
//   }
//   const [resault] = contacts.splice(index, 1);
//   await updateContacts(contacts);

//   return resault;
// };

// const addContact = async ({ name, email, phone }) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };

//   contacts.push(newContact);
//   await updateContacts(contacts);

//   return newContact;
// };

// const updateContact = async (contactId, data) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(item => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }

//   contacts[index] = { id: `${contactId}`, ...data };
//   await updateContacts(contacts);
//   return contacts[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
