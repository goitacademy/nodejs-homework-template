const {Schema, model} = require("mongoose");
const Joi = require('joi');
const handleErrors = require('../helpers/handleErrors')

const phoneRegexp = /^(\d{3}) \d{3}-\d{4}$/;

const contactSchema = new Schema({
  name:{
    type: [String, 'name is required'],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    match: phoneRegexp,
    unique: true,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
    required: true
  }, 
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleErrors);


const addSchema = Joi.object({
  name: Joi.string().required(), 
  email: Joi.string().required(), 
  phone: Joi.number().pattern(phoneRegexp).required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schema = {
  addSchema,
  updateFavoriteSchema
};

const Contact = model("contact", contactSchema);

module.exports = Contact;
module.exports = schema;

// Contact.create(req.body)

// const fs = require("fs").promises;
// const path = require("path");

// const {nanoid} = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

// const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath); 
//   return JSON.parse(data);
// }

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const result = contacts.find(contact => contact.id === contactId);
//   return result || null;
// }

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex(contact => contact.id === contactId);
//   if(idx === -1){
//     return null;
//   } 
//   const [result] = contacts.splice(idx, 1);
//   await updateContacts(contacts);
//   return result;
// }

// const addContact = async ({name, email, phone}) => {
//   const contacts = await listContacts();
//     const newContact = {
//       id: nanoid(),
//       name,
//       email,
//       phone
//   };
//   contacts.push(newContact);
//   await updateContacts(contacts);
//   return newContact;
// }

// const updateContact = async (contactId, {id, name, email, phone}) => {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex(contact => contact.id === contactId);
//   if(contactId === -1){
//     return null;
//   } 
//   contacts[idx] = {id, name, email, phone};
//   await updateContacts(contacts);
//   return contacts[idx];
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
