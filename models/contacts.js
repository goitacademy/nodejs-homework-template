const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json"); // Встановлення шляху до файлу contacts.json з використанням модуля path

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts); // Парсинг отриманого списку з формату JSON в об'єкт JavaScript
};

const getContactById = async (contactId) => {
  // Функція для отримання контакту за його ідентифікатором
  const contacts = await listContacts(); // Отримання списку контактів
  const contact = contacts.find((item) => item.id === contactId); // Пошук контакту за його ідентифікатором
  return contact || null; // Повернення знайденого контакту або значення null, якщо контакт не знайдено
};

const addContact = async (body) => {
  // Функція для додавання контакту
  const contacts = await listContacts(); // Отримання списку контактів
  const newContact = {
    // Створення нового контакту з унікальним ідентифікатором та даними з тіла запиту
    id: v4(),
    ...body,
  };

  contacts.push(newContact); // Додавання нового контакту до списку

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // Асинхронне записування списку контактів у файл contacts.json
  return newContact;
};

const removeContact = async (contactId) => {
  // Функція для видалення контакту
  const contacts = await listContacts(); // Отримання списку контактів
  const idx = contacts.findIndex((item) => item.id === contactId); // Пошук індексу контакту за його ідентифікатором
  const result = contacts[idx];
  if (!result) {
    // Якщо контакт не знайдено
    return null; // Повернення значення null
  } else {
    contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }
};
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  console.log(contacts[idx].email);
  console.log(contacts[idx].phone);
  if (idx === -1) return null;
  contacts[idx] = {
    id: contactId,
    name: body.name || contacts[idx].name,
    email: body.email || contacts[idx].email,
    phone: body.phone || contacts[idx].phone,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(contacts[idx]);
  return contacts[idx];
};

module.exports = {
  // Експорт функцій для використання у інших файлах
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
