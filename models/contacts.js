const fs = require("fs/promises");

const listContacts = async () => {
  const contactsJSON = await fs.readFile("models/contacts.json");
  const json = contactsJSON.toString();
  const contacts = JSON.parse(json);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((c) => c.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter((c) => c.id !== contactId);

  await fs.writeFile("models/contacts.json", JSON.stringify(filteredContacts));
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const contact = {
    ...body,
    id: `${contacts.length + 1}`,
  };
  contacts.push(contact);

  await fs.writeFile("models/contacts.json", JSON.stringify(contacts));
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  let replaceIndex = null;

  let contactForUpdate = contacts.find((c, index) => {
    if (c.id === contactId) {
      replaceIndex = index;
      return c;
    }
  });

  contactForUpdate = {
    ...contactForUpdate,
    ...body,
  };

  contacts[replaceIndex] = contactForUpdate;
  await fs.writeFile("models/contacts.json", JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
