const fs = require("fs/promises");
const path = require("path");
const nanoID = require("nano-id");

const contactsPath = path.resolve(__dirname, "./contacts.json");

async function listContacts() {
  try {
    const dataJSON = await fs.readFile(contactsPath, "utf-8");
    const data = JSON.parse(dataJSON);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contactData = JSON.parse(data).find(({ id }) => id === contactId);
    if (contactData) {
      return contactData;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const index = JSON.parse(data).findIndex(({ id }) => id === contactId);
    if (index === -1) {
      return null;
    } else {
      const newContactList = JSON.parse(data).filter(
        ({ id }) => id !== contactId
      );
      await fs.writeFile(
        contactsPath,
        JSON.stringify(newContactList, null, 2),
        "utf-8"
      );
      return newContactList;
    }
  } catch (error) {
    console.log(error);
  }
}

async function addContact(contact) {
  try {
    const { name, email, phone } = contact;
    const contactsJSON = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsJSON);
    const newContact = { id: nanoID(), name, email, phone };
    const newContactList = [...contacts, newContact];

    console.log(`${newContact.name} was added`);

    const data = await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactList, null, 2),
      "utf-8"
    );
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (id, { name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    const newContact = { id, name, email, phone };

    if (index === -1) {
      return null;
    }
    contacts[index] = newContact;

    const data = await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );

    return newContact;
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
