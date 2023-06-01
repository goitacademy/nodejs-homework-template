const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath, "utf-8"); // add to const result the contact.json info
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
}

async function getById(contactId) {
  try {
    const result = await fs.readFile(contactsPath, "utf-8"); // add to const result the contact.json info
    const contacts = JSON.parse(result); // result from string to obj
    const findName = contacts.find((el) => el.id === contactId); // find contactId in the result object
    return findName;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const result = await fs.readFile(contactsPath, "utf-8"); // add to const result the contact.json info
    const contacts = JSON.parse(result).filter((e) => e.id !== contactId);
    if (JSON.parse(result).length > contacts.length) {
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // write contacts string result to contactsPath file
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function addContact({ email, name, phone }) {
  const data = await fs.readFile(contactsPath, "utf-8"); // add to const result the contact.json info
  const newContact = { id: nanoid(), name, email, phone }; // create newContact obj with the id, name, email, phone params
  const contacts = JSON.parse(data); // result from string to obj
  contacts.push(newContact); // push newContact to contacts
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact; // write contacts string result to contactsPath file
}

async function updateContact(contactId, {name, email, phone}) {
  await removeContact(contactId);
  const data = await fs.readFile(contactsPath, "utf-8"); // add to const result the contact.json info
  const newContact = { id: contactId, name, email, phone }; // create newContact obj with the id, name, email, phone params
  const contacts = JSON.parse(data); // result from string to obj
  contacts.push(newContact); // push newContact to contacts
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact; // write contacts string result to contactsPath file
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
