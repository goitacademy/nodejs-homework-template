const fs = require("fs/promises");
const path = require("path");
const uuid = require('uuid');

const contactPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath, 'utf-8');
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === id);
  // return contact ? contact : null;
  if (!contact) {
    return null
  }
  return contact;
};

const removeContact = async (id) => {
    const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === id);

  const deleteContact = allContacts[index];

  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactPath, JSON.stringify(allContacts));
  }
  return deleteContact || null;
};

// removeContact('4');

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: uuid.v4(),
    body: body,
    // name: name,
    // email: email,
    // phone: phone,
  };
  

  allContacts.push(newContact);

  await fs.writeFile(contactPath, JSON.stringify(allContacts))
  return newContact;
};

const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(contact => contact.id === id);
  if (contactIndex !== -1) {
    allContacts[contactIndex].body = body;
    await fs.writeFile(contactPath, JSON.stringify(allContacts));
  }
  return body;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
