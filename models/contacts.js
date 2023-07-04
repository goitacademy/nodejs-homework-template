const fs = require("node:fs/promises"); 
const {nanoid} = require("nanoid");
const path = require ("path");
const contactsPath = path.join(__dirname, "/contacts.json"); 

// Отримання списку усіх контактів
const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

// Отримання контакту по id
const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null; // Якщо не знайдено, то повертаємо null (імітуємо роботу з БД)
}

// Додавання контакту
const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // параметри stringify, щоб при додаванні не в один рядок записувало
    return newContact;
}

// Редагування контакту
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null; // Якщо не знайдено, то повертаємо null (імітуємо роботу з БД)
  }
  contacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // параметри stringify, щоб при додаванні не в один рядок записувало
  return contacts[index];
}

// Видалення контакту
const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null; // Якщо не знайдено, то повертаємо null (імітуємо роботу з БД)
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // параметри stringify, щоб при додаванні не в один рядок записувало
    return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
