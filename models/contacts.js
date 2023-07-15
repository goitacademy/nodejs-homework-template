const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  // Повертає масив контактів
  const buffer = await fs.readFile(contactsPath);

  return JSON.parse(buffer);
};

const getContactById = async (contactId) => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();

  return contacts.find(({ id }) => id === contactId) || null;
};

const removeContact = async (contactId) => {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [contactRemoved] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contactRemoved;
};

const addContact = async (body) => {
  // Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const contactAdded = { id: nanoid(), ...body };
  contacts.push(contactAdded);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contactAdded;
};

const updateContact = async (contactId, data) => {
  // Повертає об'єкт оновленого контакту.
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [contactFinded] = contacts.splice(index, 1);
  const contactUpdated = { ...contactFinded, ...data };
  contacts.push(contactUpdated);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contactUpdated;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
