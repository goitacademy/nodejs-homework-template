const { Schema, model } = require('mongoose');
const Joi = require('joi');

const phoneRegex = /^\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})$/;
// const { HandleMongooseError } = require('../helpers');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
// contactSchema.post('save', HandleMongooseError);

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().regex(phoneRegex).message('Phone format (xxx) xxx-xxxx').required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { contactsSchema, updateFavoriteSchema };

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};

// const removeContact = async contactId => {
//   const contacts = await listContacts();

//   const index = contacts.findIndex(({ id }) => id === contactId);

//   if (index === -1) {
//     return null;
//   }

//   const [removeContact] = contacts.splice(index, 1);

//   await updateContactsFile(contacts);

//   return removeContact;
// };

// const addContact = async body => {
//   const contacts = await listContacts();

//   const newContact = { id: uuid(), ...body };

//   contacts.push(newContact);

//   await updateContactsFile(contacts);

//   return newContact;
// };

// const updateContact = async (id, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(item => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...body };
//   await updateContactsFile(contacts);
//   return contacts[index];
// };
// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
