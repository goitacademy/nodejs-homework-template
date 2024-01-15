import { promises as fsPromises } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join(process.cwd(), "/models/contacts.json");

const listContacts = async () => {
  try {
    const fileContent = await fsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Błąd podczas wczytywania listy kontaktów:", error.message);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);
    return foundContact;
  } catch (error) {
    console.error(
      `Błąd podczas wyszukiwania kontaktu o ID ${contactId}:`,
      error.message
    );
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (body) => {
  try {
    let contacts = await listContacts();
    const newContact = { id: nanoid(), ...body };
    contacts.push(newContact);
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Nowy kontakt został pomyślnie dodany.");
  } catch (error) {
    console.error("Błąd podczas dodawania nowego kontaktu:", error.message);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (err) {
    console.error(err.message);
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
