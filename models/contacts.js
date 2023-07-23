const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.normalize(
  "./models/contacts.json"
);

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);

  return contacts.toString();
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = JSON.parse(contacts).filter(
    (obj) => obj.id === contactId
  );

  return contact[0] ?? null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const needContact = await getContactById(contactId);
  if (!needContact) {
    return null;
  }

  const newContacts = JSON.parse(contacts).filter(
    (obj) => obj.id !== contactId
  );

  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2)
  );

  return needContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const contactToAdd = {
    id: nanoid(),
    ...body,
  };

  const newContacts = [
    ...JSON.parse(contacts),
    contactToAdd,
  ];

  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2)
  );

  return contactToAdd;
};

const updateContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    return null;
  }
  await removeContact(contactId);
  return await addContact({ ...contact, ...body });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
