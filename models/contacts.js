const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function findFile() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const listContacts = async () => {
  try {
    return await findFile();
  } catch (e) {
    console.log(e.message);
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await findFile();
    const findContact = contacts.find((contact) => contact.id === id);
    return findContact || null;
  } catch (e) {
    console.log(e.message);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await findFile();
    const findIndexContact = contacts.findIndex((contact) => contact.id === id);
    if (findIndexContact === -1) {
      return null;
    }

    const [result] = contacts.splice(findIndexContact, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return result;
  } catch (e) {
    console.log(e.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await findFile();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (e) {
    console.log(e.message);
  }
};

const updateContact = async (id, body) => {
  const contacts = await findFile();
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
