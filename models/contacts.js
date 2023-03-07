const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const [contact] = JSON.parse(data).filter((cont) => cont.id === contactId);
    if (contact) {
      return contact;
    }
  } catch (error) {
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data).filter(
      (contact) => contact.id !== contactId
    );
    if (JSON.parse(data).length > contacts.length) {
      await fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );
      return contacts;
    }
  } catch (error) {
    return error;
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    body.id = crypto.randomUUID();
    const contacts = JSON.parse(data);
    contacts.push(body);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return contacts;
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    contacts.forEach(async (contact) => {
      if (contact.id === contactId) {
        if (body.name) {
          contact.name = body.name;
        }
        if (body.email) {
          contact.email = body.email;
        }
        if (body.phone) {
          contact.phone = body.phone;
        }
        await fs.writeFile(
          contactsPath,
          JSON.stringify(contacts, null, 2),
          "utf-8"
        );
        return contacts;
      }
    });
    return contacts;
  } catch (error) {
    return error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
