// оголошую змінну, яка використовує модуль fs(система файлів).
const fs = require("fs/promises");

// треба для роботи з шляхами файлів
const path = require("path");

// генерує рандомні id для контактів
const getNanoid = async () => {
  const { nanoid } = await import("nanoid");
  return nanoid();
};
//  змінна, яка об'єднує поточний каталог(_dirname) і назву файлу з існуючими контактами
const contactsPath = path.join(__dirname, "./contacts.json");

// оновлення всіх існуючих контактів
const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

// повертає всі контакти
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

// ...повертає об'єкт контакту з таким id.якщо не знайдено, то null
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

// видалення існуючого контакту
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeId] = contacts.splice(index, 1);
  updateContacts(contacts);
  return removeId;
};
// ...повертає об'єкт доданого контакту
const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: getNanoid(),
    ...body,
  };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

// оновлення існуючого контакту
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    updateContacts(contacts);
    return contacts[index];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
