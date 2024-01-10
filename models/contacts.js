const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, "/contacts.json");

async function updateContactsList(list) {
  try {
    const data = await fs.writeFile(
      contactsPath,
      JSON.stringify(list, undefined, 2)
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const newContactsList = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await updateContactsList(newContactsList);

    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const contact = {
      name,
      email,
      phone,
      id: crypto.randomUUID(),
    };
    const newContactsList = contacts;
    newContactsList.push(contact);
    await updateContactsList(newContactsList);

    return contact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;

    const contacts = await listContacts();
    const formatedContact = contacts.find(
      (contact) => contact.id === contactId
    );
    if (!formatedContact) {
      console.log(formatedContact);

      return null;
    }

    if (name !== "".trim() || name !== formatedContact.name) {
      formatedContact.name = name;
    }
    if (email !== "".trim() || email !== formatedContact.email) {
      formatedContact.email = email;
    }
    if (phone !== "".trim() || phone !== formatedContact.phone) {
      formatedContact.phone = phone;
    }

    const newContactsList = await contacts.filter(
      (contact) => contact.id !== contactId
    );
    newContactsList.push(formatedContact);

    await updateContactsList(newContactsList);
    return formatedContact;
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
