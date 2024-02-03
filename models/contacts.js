import path from "path";
import { promises as fs } from "fs";
import { randomBytes } from "crypto";

const contactsPath = path.join(process.cwd(), "models/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    return error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const getContact = contacts.find((contact) => contact.id === contactId);
    return getContact;
  } catch (error) {
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => {
      return id === contactId.toString();
    });
    if (index === -1) {
      return null;
    }
    const [removedContacts] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContacts;
  } catch (error) {}
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    contacts.push({
      id: randomBytes(10).toString("hex"),
      name: name,
      email: email,
      phone: phone,
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;

    const contacts = await listContacts();

    contacts.forEach((contact) => {
      if (contact.id === contactId) {
        if (name) contact.name = name;
        if (email) contact.email = email;
        if (phone) contact.phone = phone;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    return error;
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
