const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.resolve(__dirname, "..", "db", "contacts.json");

// Функция для обработки ошибок при парсинге JSON
async function parseJSON(jsonData) {
  try {
    return JSON.parse(jsonData);
  } catch (error) {
    throw new Error("Ошибка при парсинге JSON: " + error.message);
  }
}

async function listContacts() {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await fs.readFile(contactsPath, "utf8"); // Чтение в кодировке UTF-8
    const contacts = await parseJSON(data);
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  // eslint-disable-next-line no-useless-catch
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    throw error;
  }
}

// Функция для валидации данных контакта перед добавлением или обновлением
function validateContact(contact) {
  if (!contact.name || !contact.email || !contact.phone) {
    throw new Error("Недостаточно required-полей: name, email, and phone");
  }
}

async function removeContact(contactId) {
  // eslint-disable-next-line no-useless-catch
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }

    const removedContact = contacts.splice(index, 1)[0]; // Удаление и сохранение удаленного контакта
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    throw error;
  }
}

async function addContact({ name, email, phone }) {
  // eslint-disable-next-line no-useless-catch
  try {
    validateContact({ name, email, phone }); // Валидация данных
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}

async function updateContact(contactId, updatedFields) {
  // eslint-disable-next-line no-useless-catch
  try {
    validateContact(updatedFields); // Валидация обновленных данных
    const allContacts = await listContacts();
    const index = allContacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }

    const updatedContact = { ...allContacts[index], ...updatedFields };
    allContacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return updatedContact;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};