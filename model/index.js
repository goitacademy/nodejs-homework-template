const DB = require('./db');
const db = new DB('contacts.json');
const crypto = require('crypto');

const listContacts = async () => {
  return await db.read();
};

// const getContactById = async contactId => {
//   try {
//     const data = await db.readFile();
//     const contacts = JSON.parse(data);

//     const requiredContact = contacts.find(
//       contact => contact.id.toString() === contactId
//     )

//     return requiredContact
//   } catch (e) {
//     throw new Error(e)
//   }
// }
const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find(({ id }) => id === contactId);
  return result;
};


const removeContact = async contactId => {
  const contacts = await db.read();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    const [result] = contacts.splice(index, 1);
    await db.write(contacts);
    return result;
  }
  return null;
};

const addContact = async body => {
  const contacts = await db.read();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await db.write(contacts);
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
