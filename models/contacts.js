const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;
require("colors");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = JSON.parse(await readFile(contactsPath));

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const res = data.find((contact) => contact.id === contactId);

    return !res ? null : res;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();

    const res = data.findIndex((contact) => contact.id === contactId);

    if (res !== -1) {
      const [contact] = data.splice(res, 1);
      await writeFile(contactsPath, JSON.stringify(data, null, 2));

      return contact;
    }
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const data = await listContacts();

    const newContact = { ...body, id: uuid() };

    if (data.some((contact) => contact.phone !== newContact.phone)) {
      console.log("already have this contact!!".red);

      return;
    } else {
      data.push(newContact);
      await writeFile(contactsPath, JSON.stringify(data, null, 2));

      return newContact;
    }
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const res = data.findIndex((contact) => contact.id === contactId);

    if (res === -1) {
      return null;
    }

    data[res] = { ...body, id: contactId };

    await writeFile(contactsPath, JSON.stringify(data, null, 2));

    return data[res];
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
