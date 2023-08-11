const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactJson = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(contactJson);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [contactById] = contacts.filter((contact) => contact.id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (removedContactIndex === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(removedContactIndex, 1);
  writeContacts(contacts);
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const [contactToUpdate] = contacts.filter(
    (contact) => contact.id === contactId
  );
  if (!contactToUpdate) {
    return null;
  }
  const updateContacts = contacts.map((contact) => {
    if (contact.id !== contactToUpdate.id) {
      return contact;
    }
    return {
      id: contact.id,
      name,
      email,
      phone,
    };
  });

  writeContacts(updateContacts);
  return updateContacts.filter((contact) => {
    return contact.id === contactId;
  });
};

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
