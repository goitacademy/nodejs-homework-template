// const fs = require('fs/promises');
// const path = require('path');
// const { nanoid } = require('nanoid');

// const contactsPath = path.join(__dirname, 'contacts.json');

// const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath, 'utf-8');
//     const contacts = JSON.parse(data);

//     return contacts;
//   } catch (error) {
//     console.error("Error reading contacts file: ", error);
//     throw error;
//   }
// }

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const contact = contacts.find(item => item.id === contactId);
//     return contact || null;
//   } catch (error) {
//     console.error("Error getting contact by ID: ", error);
//     throw error;
//   }
// }

// const removeContact = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(contact => contact.id === contactId);

//     if (index === -1) {
//       return false;
//     }

//      contacts.splice(index, 1);

//      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//      return true;

//    } catch (error) {
//      console.error("Error removing contact:", error);
//      throw error;
//    }
//  };

// const addContact = async ({name, email, phone }) => {

//   const newContact = {
//     id: nanoid(21),
//     name,
//     email,
//     phone
//   };

//   try {
//     const contacts = await listContacts();

//     contacts.push(newContact);

//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   } catch (error) {
//     console.error("Error adding contact: ", error);
//     throw error;
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(contact => contact.id === contactId);

//     if (index === -1) {
//       return null;
//     }

//     const updatedContact = { ...contacts[index], ...body };
//     contacts[index] = updatedContact;

//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//     return updatedContact;
//   } catch (error) {
//     console.error("Error updategin cotnact: ", error);
//     throw error;
//   }
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
