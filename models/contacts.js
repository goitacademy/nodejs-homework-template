const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.format({
  root: "/ignored",
  dir: "models",
  base: "contacts.json",
});

const listContacts = async () => {
  return fs.readFile(contactsPath).then((contacts) => {
    return JSON.parse(contacts);
  });
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  return contactsList.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const contactIndex = contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  const deletedContact = contactsList[contactIndex];
  if (contactIndex !== -1) {
    contactsList.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  }
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  const contactsList = await listContacts();
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contactsList = await listContacts();
  const contactIndex = contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  allContacts[contactIndex] = {
    ...allContacts[contactIndex],
    name,
    email,
    phone,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return allContacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
