const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.join(__dirname, "/contacts.json");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
      const data = await fs.readFile(`${contactsPath}`, "utf-8");
      return JSON.parse(data);
}

const getContactById = async (contactId) => {

    const data = await listContacts();
    const contact = data.find((el) => el.id === contactId);
    return contact || null
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...data };
  const contactIsFound = contacts.findIndex(
    (item) => item.name.toLowerCase() === data.name.toLowerCase()
  );
  if (contactIsFound !== -1) {
    return null
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts= await listContacts();
  const contactIndex = contacts.findIndex(item => item.id === contactId)
  const deletedContact = contacts[contactIndex]
  if (contactIndex === -1) {
    return null
  }
  contacts.splice(contactIndex, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact
}



const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(item => item.id === contactId);
  if (contactIndex === -1) {
    return null
  }
  const updatedContact = {...contacts[contactIndex], ...body}
  
  contacts.splice(contactIndex, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
