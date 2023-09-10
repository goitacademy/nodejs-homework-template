const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// Оновлення списку контактів
const updateContacts = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

// Повертає масив контактів.
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
};
// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await updateContacts(data);
  return result;
};
//  Повертає об'єкт доданого контакту.
const addContact = async (body) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  data.push(newContact);
  await updateContacts(data);
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = {
    id,
    ...body,
  };

  await updateContacts(contacts);
  return contacts[index];
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
