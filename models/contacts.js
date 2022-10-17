const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const filePath = require("./filePath");

// ==================ОТРИМАТИ ВЕСЬ СПИСОК КОНТАКТІВ===================
const listContacts = async () => {
  try {
    const contacts = await fs.readFile(filePath);
    const contactsList = JSON.parse(contacts);
    return contactsList;
  } catch (error) {
    console.log(error);
  }
};

// ====================ЗНАЙТИ КОНТАКТ ЗА ЙОГО ID======================
const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(filePath);
    const contactsList = JSON.parse(contacts);
    const resultSearchId = contactsList.some((elem) => elem.id === contactId);
    return resultSearchId;
  } catch (error) {
    console.log(error);
  }
};

// ================ВИДАЛЕННЯ КОНТАКТ ЗІ СПИСКУ ПО ID===================
const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(filePath);
    const contactsList = JSON.parse(contacts);
    const filterContacts = contactsList.filter((elem) => elem.id !== contactId);
    fs.writeFile(filePath, JSON.stringify(filterContacts));
    const parsedContacts = contactsList.filter((elem) => elem.id === contactId);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
};

// ===============ДОДАВАННЯ НОВОГО КОНТАКТУ ДО СПИСКУ==================
const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = fs.readFile(filePath);
    const contactsList = JSON.parse(contacts);
    const newContact = { id: nanoid(), name: name, email: email, phone: phone };
    const newContactsList = [...contactsList, newContact];
    fs.writeFile(filePath, JSON.stringify(newContactsList));
    console.log(`Додали новий контакт ${name}`);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

// ================ОНОВЛЕННЯ ІСНУЮЧОГО КОНТАКТУ========================
const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contacts = fs.readFile(filePath);
    const contactsList = JSON.parse(contacts);
    const filterContacts = contactsList.filter((elem) => elem.id !== contactId);
    if (contactsList.length === filterContacts.length) {
      return null;
    }

    const updatedContact = { id: contactId, name, email, phone };
    const newContactsList = [...filterContacts, updatedContact];
    fs.writeFile(filePath, JSON.stringify(newContactsList));
    console.log(`Оновлено контакт ${name}`);
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
