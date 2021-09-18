const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function getContactsPath() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function listContacts() {
  try {
    const result = await getContactsPath();
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const result = await getContactsPath();

    const oneContact = await result.find(
      (item) => String(item.id) === contactId
    );

    return oneContact;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const result = await getContactsPath();

    const idx = await result.findIndex((item) => String(item.id) === contactId);
    const removeContact = result[idx];
    const newContacts = result.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    return removeContact;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function addContact(body) {
  try {
    const result = await getContactsPath();

    const newData = { id: v4(), ...body };
    const newContacts = [...result, newData];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    return newData;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function updateContact(contactId, body) {
  try {
    const newData = { id: contactId, ...body };

    const result = await getContactsPath();
    const idx = await result.findIndex(
      (item) => String(item.id) === String(contactId)
    );
    if (idx === -1) {
      return null;
    }
    result[idx] = newData;
    await fs.writeFile(contactsPath, JSON.stringify(result));

    return result[idx];
  } catch (error) {
    console.log(error.message);
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
