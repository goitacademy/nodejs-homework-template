import fs from "fs/promises"; // Імпортуємо функцію яка для операцій з файлами
import path from "path"; // Імпортуємо функцію для вказання абсолютного шляху
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json"); // Вказуємо шлях до файлу з даними

const listContacts = async () => {
  const allList = await fs.readFile(contactsPath).then((data) => data);
  return JSON.parse(allList);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  data[index] = { ...data[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
};

const deleteContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  deleteContact,
};
