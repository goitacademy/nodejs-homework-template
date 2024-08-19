import { promises as fs } from "node:fs";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    await fs.access(contactsPath);
    const file = await fs.readFile(contactsPath);
    const contacts = JSON.parse(file);
    return contacts;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania listy kontaktów", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.error("Nieprawidłowe ID - error!", error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const afterDelete = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(afterDelete));
    return afterDelete;
  } catch (error) {
    console.error("Not found");
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(21),
      name,
      email,
      phone,
    };
    const updateListContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updateListContacts));
    return newContact;
  } catch (error) {
    console.error("Coś poszło nie tak", error);
  }
};

const updateContact = async (contactId, name, email, phone) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      return null;
    }
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;

    const updateContact = { ...contact, ...updates };

    const updatedContactsList = contacts.map((contact) =>
      contact.id === contactId ? updateContact : contact
    );

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContactsList, null, 2)
    );
    return updateContact;
  } catch (error) {
    console.error("Coś poszło nie tak", error);
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
