const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const randomId = function (length = 6) {
  return Math.random().toString(36).substring(2, length + 2);
};
const updateContacts = async (allContacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};


const getContactById = async ({ contactId }) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(({ id }) => id === contactId);
  return contact || null;
};


const removeContact = async ({ contactId }) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  const [result] = allContacts.splice(index, 1);
  updateContacts(allContacts);
  return result;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: randomId(21),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  updateContacts(allContacts);
  return newContact;
};

const updateContact = async ({ contactId }, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  allContacts[index] = { ...allContacts[index], ...body };
  updateContacts(allContacts);
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
