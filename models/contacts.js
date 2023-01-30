import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("./contacts.json");

export async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return contact;
}

export async function removeContact(contactId) {
  let contacts = await listContacts();
  contacts = contacts.filter((contact) => contact.id !== contactId.toString());
  try {
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return `Contact with id:${contactId} successfully removed`;
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  contacts.push({
    id: nanoid(),
    name,
    email,
    phone,
  });
  try {
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts.slice(-1)[0];
  } catch (error) {
    console.log(error);
  }
}

// const updateContact = async (contactId, body) => {};
