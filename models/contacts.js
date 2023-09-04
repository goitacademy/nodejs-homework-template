const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    ...body,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  // Функція для оновлення контакту
  const contacts = await listContacts(); // Отримання списку контактів
  const idx = contacts.findIndex((item) => item.id === contactId); // Пошук індексу контакту за його ідентифікатором
  if (idx === -1) {
    // Якщо контакт не знайдено
    return null; // Повернення значення null
  }
  contacts[idx] = { id: contactId, ...body }; // Оновлення контакту з новими даними;
  await fs.writeFile(contactsPath, JSON.stringify(contactId, null, 2)); // Асинхронне записування оновленого списку контактів у файл contacts.json
  return contacts[idx]; // Повернення оновленого контакту
};

module.exports = {
  // Експорт функцій для використання у інших файлах
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
