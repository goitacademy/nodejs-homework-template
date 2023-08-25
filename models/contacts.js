const { error } = require("console");
const { json } = require("express");
const fs = require("fs/promises");
const path = require("path");

const contactsDataPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsDataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Błąd podczas wczytywania kontaktów z pliku.");
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsDataPath, "utf8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      throw new Error("Contact not found.");
    }
    return contact;
  } catch (error) {
    throw new Error("Błąd podczas wczytywania kontaktu z pliku.");
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsDataPath, "utf8"));
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(
      contactsDataPath,
      JSON.stringify(updatedContacts, null, 2)
    );

    return true;
  } catch (error) {
    console.error("Error removing contact:", error);
    return false;
  }
};

const addContact = async (body) => {
  try {
    const date = new Date();
    const contacts = JSON.parse(await fs.readFile(contactsDataPath, "utf8"));
    const contactId = (
      Math.floor(Math.random() * 1000) * parseInt(date.getTime() * 100)
    ).toString();
    const newcontact = { id: contactId, ...body };
    contacts.push(newcontact);

    await fs.writeFile(contactsDataPath, JSON.stringify(contacts, null, 2));

    return newcontact;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsDataPath, "utf8"));
    const changedContacts = contacts.map((contact) =>
      contact.id === contactId ? { ...contact, ...body } : contact
    );

    await fs.writeFile(
      contactsDataPath,
      JSON.stringify(changedContacts, null, 2)
    );

    return changedContacts;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
