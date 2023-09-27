const fs = require("node:fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
// const getNanoid = async () => {
//   const module = await import("nanoid");
//   return module.nanoid;
// };

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    if (!contact) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Contact with id=${id} not found`);
    }
    const newContacts = contacts.filter((item) => item.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[index];
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();

    const newContact = await { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log("New Contact:", newContact);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async ({ id, name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    console.log("SERVICES Index:", index);
    console.log("CONTACT ID", id);

    if (index === -1) {
      throw new Error(`Contact with id=${id} not found`);
    }

    const updatedContact = { ...contacts[index], name, email, phone };
    contacts[index] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log("SERVICES Updated Contact:", updatedContact);

    return updatedContact;
  } catch (error) {
    console.log("SERVICES Update Error:", error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
