const {Schema, model} = require("mongoose");

const Joi = require("joi");

const toEmail = { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } };

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey: false, timestamps: true})

contactSchema.post("save", (error, data, next) => {
  const {name, code} = error;
  error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
  next();
})

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(toEmail),
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
  schemas,
  Contact,
}


// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "./contacts.json");

// const updateContacts = async (contacts) =>
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));

// const updateById = async (id, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...body };
//   await updateContacts(contacts);
//   return contacts[index];
// };

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getContactById = async (id, body) => {
//   const contacts = await listContacts();
//   const result = contacts.find(item => item.id === id);
//   return result || null;
// };

// const removeContact = async (id) => {
//   const contacts = await listContacts();
//   const index = contacts.find((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await updateContacts(contacts);
//   return result;
// };

// const addContact = async (data) => {
//   const contacts = await listContacts();
//   const newContacts = {
//     id: nanoid(),
//     ...data,
//   };
//   contacts.push(newContacts);
//   await updateContacts(contacts);
//   return newContacts;
// };

// module.exports = {
//   listContacts,
//   updateById,
//   updateContacts,
//   getContactById,
//   addContact,
//   removeContact,
// };
