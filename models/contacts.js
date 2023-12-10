import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");
console.log(contactsPath);

const contactsService = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  const data = JSON.parse(buffer);
  return data;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contactId === contact.id) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const contactToDelete = contacts.findIndex(
    (contact) => contactId === contact.id
  );
  if (contactToDelete !== -1) {
    const deletedContact = contacts.splice(contactToDelete, 1);
    await contactsService(contacts);
    return deletedContact;
  } else {
    return null;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  if (
    contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    return { message: "Contact exists" };
  } else {
    const contact = {
      name,
      email,
      phone,
      id: nanoid(),
    };

    contacts.push(contact);
    await contactsService(contacts);
    return contact;
  }
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
