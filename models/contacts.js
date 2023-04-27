const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  console.log(`Contact with id: ${contactId} deleted`);
  const deletedContact = await getContactById(contactId);
  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: `${Date.now()}`, ...body };
  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  console.log("Added new contact");
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updatePayload = body;
  const contactToUpdate = await getContactById(contactId);
  const updatedContact = { ...contactToUpdate, ...updatePayload };
  const updatedContactsList = contacts.map((contact) =>
    contact.id === contactId ? updatedContact : contact
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));
  console.log(`Contact with id: ${contactId} changed`);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
