const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// метод path.join збирає та нормалізує абсолютний шлях до файлу
const contactsPath = path.join(__dirname, "contacts.json");

// читає файл контактів, форматує його та повертає масив контактів
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};


// відфільтровує по id та повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений

const getContactById = async (id) => {
    const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
};



// отримуємо всі контакти, знаходимо необхідний по id. Якщо не знайдено такий індекс, то повертає null.
//  Повертає об'єкт видаленого контакту(метод splice)
// Повністю перезаписує список контактів

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};


// отримує всі контакти, розпиляє їх, додає новий контакт. Повністю перезаписує масив контактів вже з новим контактом.
//  Повертає об'єкт доданого контакту.
const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};


// отримуємо всі контакти, знаходимо необхідний по id. Якщо не знайдено такий індекс, то повертає null.
// Якщо знайдено, то перезаписуємо масив контакту та оновлюємо весь список контактів. Повертає об'єкт оновленого контакту
const updateContact = async (id, body) => {
const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id, ...body };
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
