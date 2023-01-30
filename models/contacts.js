const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const MOCK_DB_FILENAME = "contacts.json";

const dbPath = path.join(
  __dirname,
  MOCK_DB_FILENAME
);

const listContacts = async () => {
  const contacts = await fs.readFile(dbPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(
    (c) => c.id === contactId
  );
  if (!contact) return null;
  return contact;
};

const removeContact = async (contactId) => {
  const toRemove = await getContactById(
    contactId
  );
  if (!toRemove) return null;
  const contacts = await listContacts();
  await fs.writeFile(
    dbPath,
    JSON.stringify(
      contacts.filter(
        (contact) => contact.id !== contactId
      )
    )
  );
  return toRemove;
};

const addContact = async (body) => {
  const newbie = { ...body, id: nanoid() };
  const contacts = await listContacts();
  await fs.writeFile(
    dbPath,
    JSON.stringify({
      ...contacts,
      ...newbie,
    })
  );
  return newbie;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (index === -1) return null;

  contacts[index] = {
    ...contacts[index],
    ...body,
  };

  await fs.writeFile(
    dbPath,
    JSON.stringify(contacts)
  );
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
