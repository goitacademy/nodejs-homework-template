import fs from "fs/promises";
import { nanoid } from "nanoid";

const readContacts = async () => {
  try {
    const data = await fs.readFile("./models/contacts.json", "utf-8");
    const contacts = JSON.parse(data);

    return contacts;
  } catch (err) {
    throw new Error(`While processing ./models/contacts.json`, { cause: err });
  }
};

const writeContacts = async (contacts) => {
  try {
    await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));
  } catch (err) {
    throw new Error(`While processing ./models/contacts.json`, { cause: err });
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

const addContact = async (body) => {
  try {
    const contacts = await readContacts();
    const newContact = { ...body, id: nanoid() };
    contacts.push(newContact);
    await writeContacts(contacts);

    return newContact;
  } catch (err) {
    return err;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContacts();

    const index = contacts.findIndex((item) => item.id === contactId);

    if (index === -1) {
      return null;
    }

    const filteredContacts = contacts.filter((item) => item.id !== contactId);

    await writeContacts(filteredContacts);

    return filteredContacts;
  } catch (err) {
    return err;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContacts();
    const index = contacts.findIndex((item) => item.id === contactId);

    if (index === -1) {
      return null;
    }

    contacts[index] = { ...contacts[index], ...body };

    await writeContacts(contacts);

    return contacts[index];
  } catch (err) {
    return err;
  }
};

export {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
