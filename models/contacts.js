const fs = require("fs/promises");

const listContacts = async () => {
  try {
    const data = await fs.readFile("models/contacts.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading contacts:", err);
    return [];
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === parseInt(contactId));
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== parseInt(contactId)
  );
  await fs.writeFile(
    "models/contacts.json",
    JSON.stringify(updatedContacts, null, 2)
  );
  return true;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: Date.now(), ...body };
  contacts.push(newContact);
  await fs.writeFile("models/contacts.json", JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.map((contact) =>
    contact.id === parseInt(contactId) ? { ...contact, ...body } : contact
  );
  await fs.writeFile(
    "models/contacts.json",
    JSON.stringify(updatedContacts, null, 2)
  );
  return updatedContacts.find((contact) => contact.id === parseInt(contactId));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
