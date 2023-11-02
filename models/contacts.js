const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// вписати ті файли які ми писали для роботи джейсона contacts.json (та як на минулій домашці)
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const contacts = await listContacts();
  const results = contacts.find((item) => item.id === id);
  return results || null;
};


const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

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

// const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getById,
  // removeContact,
  addContact,
  // updateContact,
};
