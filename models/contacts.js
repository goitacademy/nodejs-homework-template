import fs from "fs/promises";
import { nanoid } from "nanoid";

const readContacts = async () => {
  try {
    const data = await fs.readFile("./models/contacts.json", "utf-8");
    const contacts = JSON.parse(data);

    return contacts;
  } catch (err) {
    return err;
  }
};

const listContacts = async () => {
  try {
    const contacts = await readContacts();

    return contacts;
  } catch (err) {
    return err;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readContacts();
    const contact = contacts.find((item) => item.id === contactId);

    return contact;
  } catch (err) {
    return err;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContacts();
    const filteredContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile("./contacts.json", JSON.stringify(filteredContacts));

    return filteredContacts;
  } catch (err) {
    return err;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await readContacts();
    const newContact = { ...body, id: nanoid() };
    contacts.push(newContact);
    await fs.writeFile("./contacts.json", JSON.stringify(contacts));

    return newContact;
  } catch (err) {
    return err;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContacts();
    const index = contacts.findIndex((item) => item.id === contactId);

    // if (index === -1) {
    //   return null;
    // }

    contacts[index] = { ...contacts[index], ...body };

    await fs.writeFile("./contacts.json", JSON.stringify(contacts));

    return contacts[index];
  } catch (err) {
    console.log(err);
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
