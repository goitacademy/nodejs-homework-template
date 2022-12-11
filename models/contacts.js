const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const requiredContact = contacts.find(({ id }) => id === contactId);
    if (!requiredContact) {
      throw new Error(`Contacts with id=${contactId} not found`);
    }
    return requiredContact || null;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const requiredContactIdx = contacts.findIndex(({ id }) => id === contactId);

    if (requiredContactIdx === -1) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    const updateContact = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFilter(contactsPath, JSON.stringify(updateContact, null, 2));

    return contacts[requiredContactIdx];
};

const addContact = async (body) => {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const requiredContactIdx = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (requiredContactIdx === -1) {
    return null;
  }
  contacts[requiredContactIdx] = {
    id: nanoid(),
    ...body,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[requiredContactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
