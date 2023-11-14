const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, {encoding: "UTF-8"});
    return JSON.parse(contacts);
  
}

const getContactById = async (contactId) => {
const contacts = await listContacts();
const contact = contacts.find((contact) => contact.id === contactId);
return contact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.findIndex((contact) => contact.id === contactId);
  if(contact === -1) {
return null;
  }
  const removedContact = contacts.splice(contact, 1)[0];
  await fs.writeFile(contactsPath,  JSON.stringify(contacts, null, 2), {
    encoding: "UTF-8"
  });
  return removedContact;

}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {id: crypto.randomUUID(), ...body};
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.findIndex((contact) => contact.id === contactId);
  if (contact === -1) {
    return null;
  }

  contacts[contact] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contact];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
