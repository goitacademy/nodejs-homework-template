const { Schema, model } = require('mongoose');

const phoneRegex = /^\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      minlength: 2,
      maxlength: 55,
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
  { verisonKeu: false, timestamps: true }
);

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
};

// const contactsPath = path.join(__dirname, 'contacts.json');
// const updateContactsFile = async contacts => {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };
//  const contacts = require('../models/contacts.json');

// const listContacts = async () => {
//   const contacts = await fs.readFile(contactsPath, 'utf-8');

//   return JSON.parse(contacts);
// };

// const getContactById = async contactId => {
//   const contacts = await listContacts();
//   const contact = contacts.find(({ id }) => id === contactId);

//   if (!contact) {
//     return null;
//   }

//   return contact;
// };

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
