// відновлення видалених в  hw-03 файлів з метою збереження початкових даних
// в  hw-02  цей файл був знаходився в папці models
// в даній гілці відновлений і переміщений в папку services замість models,
// файл contacts.json також переміщений з папки models в папку db

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

const getContactsService = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactService = async (id) => {
  const contacts = await getContactsService();
  const contact = contacts.find((item) => item.id === id);
  return contact || null;
};

const createContactService = async ({ name, email, phone }) => {
  const contacts = await getContactsService();

  const isPhoneExist = contacts.some((item) => item.phone === phone);
  if (isPhoneExist) {
    return null;
  }
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContactService = async (id, body) => {
  const contacts = await getContactsService();

  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const deleteContactService = async (id) => {
  const contacts = await getContactsService();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
};
