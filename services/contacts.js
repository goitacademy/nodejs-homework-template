// const fs = require('fs/promises');
// const path = require('path');
// const { runInNewContext } = require('vm');

const { Contact } = require('./schemas/contact');

// const pathContacts = path.resolve('../models/contacts.json');
// const pathContacts = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const contactsList = await listContacts();
    return contactsList.find(contact => contact._id.toString() === contactId);
  } catch (error) {
    console.error(error.message);
  }
};

// const addContact = async body => {
//   try {
//     const contactsList = await listContacts();
//     contactsList.push(body);
//     const contactsBySort = [...contactsList].sort(
//       (a, b) => Number(a.id) - Number(b.id)
//     );
//     await fs.writeFile(pathContacts, JSON.stringify(contactsBySort), 'utf8');
//     return body;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const removeContact = async contactId => {
//   try {
//     const contactsList = await listContacts();
//     const newContactsList = contactsList.filter(el => el.id !== contactId);
//     await fs.writeFile(pathContacts, JSON.stringify(newContactsList), 'utf8');
//   } catch (error) {
//     console.error(error);
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const contactsList = await listContacts();
//     const contact = contactsList.find(el => el.id === contactId);

//     if (contact === undefined) {
//       return null;
//     }

//     const contactUpdated = { ...contact, ...body };
//     await removeContact(contactId);
//     await addContact(contactUpdated);
//     return contactUpdated;
//   } catch (error) {
//     console.error(error);
//   }
// };

module.exports = {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
};
