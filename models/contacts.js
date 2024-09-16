// const fs = require("fs").promises;
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

// общий параметр обновления списка
const updateContactsList = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// функция формирования всего списка контактов
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

// функция доступа к контакту по ид
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId.toString());
  return result;
}

// функция удаления контакта по ид
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContactsList(contacts);
  return result;
}

// функция добавления нового контакта
async function addContact(id, name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContactsList(contacts);
  return newContact;
}

// функция обновления данных в контакте по ид
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await updateContactsList(contacts);
  return contacts[index];
};

// экспортируем все эти функции
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
