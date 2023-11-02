const fs = require('fs/promises');
const path = require("path");
// const nanoid = require("nanoid")


const contactsPath = path.join(__dirname, "contacts.json");

// вписати ті файли які ми писали для роботи джейсона contacts.json (та як на минулій домашці)
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const results = contacts.find((item) => item.id === contactId);
  return results || null;
}

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(item => item.id === contactId);
//   if( index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice([index], 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
  
// }

// const addContact = async (body) => {
//   const allContacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     body
//   };
//   allContacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
//   return newContact
// }

// const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
}
