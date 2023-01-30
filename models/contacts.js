import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { RequestError } from "../helpers/RequestError.js";

const contactsPath = path.resolve("./models/contacts.json");
export async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!contact) {
    throw RequestError(404, "Not found");
  }
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
