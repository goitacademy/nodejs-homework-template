const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "./contacts.json");

const changeListContacts = async (list) => {
  return await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");
};

const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const result = list.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const filteredContacts = JSON.parse(contacts).filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return JSON.parse(contacts).filter((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const list = await listContacts();
  const id = list.reduce(
    (acc, num) => (acc > Number(num.id) ? acc : (acc = Number(num.id))),
    0
  );
  const newArray = { id: `${id + 1}`, ...body };
  await changeListContacts([...list, newArray]);
  return newArray;
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const item = list.find((r) => r.id === contactId);
  const i = list.findIndex((r) => r.id === contactId);
  if (!item) {
    return false;
  }
  const update = { ...item, ...body };
  list[i] = update;
  await changeListContacts(list);
  return update;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
