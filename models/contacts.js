const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const filePath = path.join(__dirname, "contacts.json");
const contacts = async (contact) =>
  fs.writeFile(filePath, JSON.stringify(contact, null, 2));
async function listContacts() {
  try {
    const list = await fs.readFile(filePath);
    return JSON.parse(list);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const list = await listContacts();
    const oneContact = list.find((item) => item.id === contactId);
    return oneContact || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const list = await listContacts();
    const findIndex = list.findIndex((item) => item.id === contactId);
    if (findIndex === -1) return null;
    const [result] = list.splice(findIndex, 1);
    await contacts(list);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const list = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    list.push(newContact);
    await contacts(list);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}
async function updateContact(id, data) {
  try {
    const list = await listContacts();
    const indexContact = list.findIndex((item) => item.id === id);
    if (indexContact === -1) {
      return null;
    }
    list[indexContact] = { id, ...data };
    await fs.writeFile(filePath, JSON.stringify(list, null, 2));
    return list[indexContact];
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
