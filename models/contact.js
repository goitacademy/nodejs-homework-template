// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

// // Повертає масив контактів
// const listContacts = async () => {
//   const contacts = await fs.readFile(contactsPath);
//   return JSON.parse(contacts);
// };

// // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
// const getContactById = async (id) => {
//   const contacts = await listContacts();

//   const result = contacts.find((item) => item.id === id);

//   return result || null;
// };

// // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
// const removeContact = async (id) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// };

// // Повертає об'єкт доданого контакту.
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

// // Повертає об'єкт оновленого контакту.
// const updateContact = async (id, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...body };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };


const { Schema, model } = require("mongoose");
const { handleMogooseError } = require("../helpers/index");
const Joi = require("joi");

// const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/; 
// mongoose schema
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
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMogooseError);



const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

const schemas = { addSchema,}
// mongoose model
const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas, };