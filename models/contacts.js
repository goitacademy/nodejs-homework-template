const fs = require('fs/promises')
const path = require("path");

const contactsPath = path.join(
  __dirname,
  "./contacts.json"
);

const listContacts = async () => {
  const contacts = fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(
    item => item.id === contactId.toString());
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = await getContactById(contactId);

  if (!contact) {
    return null;
  }
  const deleteContact = contacts.filter(
    (item) => item.id !== contactId.toString());
  await fs.writeFile(
    contactsPath,
    JSON.stringify(deleteContact)
  );
  return contact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  contacts.push(body);
  await fs.writeFile(contactsPath,
    JSON.stringify(contacts))
}

const updateContact = async (contactId, body) => {
  const newContact = {
    contactId,
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  const deletedContact = await removeContact(
    contactId
  );
  if (!deletedContact) {
    return;
  }
  await addContact(newContact);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
