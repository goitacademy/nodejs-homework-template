// const fs = require('fs/promises')

// const listContacts = async () => {};

// const getContactById = async (contactId) => {};

// const removeContact = async (contactId) => {};

// const addContact = async (body) => {};

// const updateContact = async (contactId, body) => {};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

// --------------------------------------------------------------------

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json"); //*     "contacts.json" - теж можна записати
// console.log(contactsPath);

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  // console.log(data); //  виведе буфер в 16-му форматі
  // console.log(data.toString()); //  перетворить його у рядок
  return JSON.parse(data);
}

//! -------------   ВАРІАНТ-2 запису асинхронної ф-ції   -------------------
// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

async function getContactById(contactId) {
  const people = await listContacts();
  const result = people.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const people = await listContacts();
  const index = people.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = people.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(people, null, 3));
  //! JSON.stringify(value, replacer, space);
  //*    value: Об'єкт для перетворення у JSON.
  //*    replacer: Ф-ція або масив для фільтрації включених у JSON об'єктів. Якщо ви не хочете застосовувати фільтр, можна використовувати 'null'.
  //*    space: К-сть пробілів для відступу в JSON-рядку. Може бути числом або рядком. Також може бути використано для створення красивого форматування JSON-рядка.
  //*           Якщо не треба відступів, ви можна використовувати 'null' або просто не вказувати цей параметр.
  return result;
}

async function addContact(data) {
  const people = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  people.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(people, null, 3));
  return newContact;
}

// async function updateContact(contactId, data) {
//   const people = await listContacts();
//   const index = people.findIndex((contact) => contact.id === contactId);
//   if (index === -1) return null;
//   people[index] = { ...people[index], ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
//   return people[index];
// }

// Асинхронна ф-ція для оновлення контакту за його ідентифікатором та новими даними
async function updateContact(contactId, data) {
  // Отримати список контактів
  const people = await listContacts();
  // Знайти індекс контакту з вказаним ідентифікатором
  const index = people.findIndex((contact) => contact.id === contactId);
  // Якщо контакт не знайдено, повернути null
  if (index === -1) return null;

  // Оновити дані контакту, залишаючи інші дані незміненими
  people[index] = { ...people[index], ...data };
  // Записати оновлений список контактів у файл
  await fs.writeFile(contactsPath, JSON.stringify(people, null, 3));
  // Повернути оновлену інформацію про контакт
  return people[index];
}

//! -------------   ВАРІАНТ-2 запису асинхронної ф-ції   -------------------
// const updateContact = async (contactId, data) => {
//   const people = await listContacts();
//   const index = people.findIndex((contact) => contact.id === contactId);
//   if (index === -1) return null;
//   people[index] = { ...people[index], ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(people, null, 2));
//   return people[index];
// };

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

module.exports = contacts;
