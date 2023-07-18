const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

// Функція яка читає файл з контактами і повертає його у форматі JSON.

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

// Функція яка шукає контакт за ідентифікатором у списку контактів

const getContactById = async (contactId) => {
  const contactById = String(contactId);
  const contactsList = await listContacts();
  const result = contactsList.find((item) => item.id === contactById);
  return result || null;
};

// Функція яка додає новий контакт з вхідними даними до списку контактів і перезаписує файл з новими даними

const addContact = async (body) => {
  const id = nanoid();
  const newContact = {
    id,
    ...body,
  };
  const contactsList = await listContacts();
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
};

// Функція яка змінює контакт за ідентифікатором з вхідними даними і перезаписує файл з новими даними

const changeContact = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};


// Функція яка видаляє контакт за ідентифікатором зі списку контактів і перезаписує файл з новими даними

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}




module.exports = {
  listContacts,
  getContactById,
  addContact,
  changeContact,
  removeContact,
};