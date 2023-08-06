const fs = require("fs/promises");
const path = require("path"); // підключення пакету path для роботи з шляхами до файлів
const { nanoid } = require("nanoid");

const contactsPath = path.join("models", "contacts.json"); // шлях до файлу з контактами
// console.log(contactsPath);

//* функція яка завантажує всі контакти
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

//*  функція яка повертає один контакт по id
const getContactById = async (contactId) => {
  const contacts = await listContacts(); // отримуємо список всіх контактів
  const result = contacts.find((item) => item.id === contactId); // отрумуємо контакт по id
  return result || null;
};

//  функція яка повертає об'єкт видаленого контакту.
const removeContact = async (contactId) => {
  const contacts = await listContacts(); // отримуємо список всіх контактів
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null; // повертаємо null якщо контакт з таким id не знайдено
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // перезаписуємо файл з контактами
  return result; // повертаємо видалений контакт

  //   // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
};

//* функція яка повeртає об'єкт доданого(створеного) контакту
// const addContact = async (body) => {};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts(); // отримуємо список всіх контактів
  const newContact = {
    id: nanoid(), // генеруємо унікальний id
    name,
    email,
    phone,
  };
  contacts.push(newContact); // пушимо новий контакт до списку контактів
  /**
   * stringify повертає одну строку, тобто до файлу contacts.json буде записано не масив об'єктів а всі контакти однією строкою. Для того щоб у contacts.json було записано масив об'єктів у властивості stringify додаємо додаткові властивості, а саме у третю властивість додаємо число 1,2 або більше - це буквально отступи
   */
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // перезаписуємо файл з контактами

  return newContact;
};

// функція яка повертає контакт до якого внесені зміни
const updateContact = async (contactId, body) => {
  const contacts = await listContacts(); // отримуємо список всіх контактів
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
