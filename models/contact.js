const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
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

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(10).required(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};

// const fs = require("fs/promises");
// const path = require("path");

// const { v4 } = require("uuid");

// const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   const products = JSON.parse(data);

//   return products;
// };

// const contactById = async (contactId) => {
//   const products = await listContacts();
//   const result = products.find((contact) => contact.id === `${contactId}`);

//   if (!result) {
//     return null;
//   }

//   return result;
// };

// const removeContact = async (contactId) => {
//   const products = await listContacts();
//   const isIdForDelete = products.some((product) => product.id === contactId);

//   if (!isIdForDelete) {
//     return null;
//   }

//   const newListContacts = products.filter(
//     (contact) => contact.id !== `${contactId}`
//   );

//   await fs.writeFile(contactsPath, JSON.stringify(newListContacts));

//   return newListContacts;
// };

// const addContact = async (name, email, phone) => {
//   const products = await listContacts();
//   const newPoduct = { id: v4(), name, email, phone };
//   products.push(newPoduct);

//   await fs.writeFile(contactsPath, JSON.stringify(products));

//   return newPoduct;
// };

// const updateContact = async (contactId, name, email, phone) => {
//   const products = await listContacts();
//   const idx = products.findIndex((product) => product.id === contactId);

//   if (idx === -1) {
//     return null;
//   }

//   products[idx] = { id: contactId, name, email, phone };
//   await fs.writeFile(contactsPath, JSON.stringify(products));

//   return products[idx];
// };

// module.exports = {
//   listContacts,
//   contactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
