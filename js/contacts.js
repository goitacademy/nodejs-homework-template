import { promises as fs } from "fs";
import { format } from "path";
import { nanoid } from "nanoid";

// Path to file with contacts array.
const contactsPath = format({
  dir: "./db/",
  base: "contacts.json",
});

// Returns all contacts
async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return contacts.toString();
  } catch (e) {
    return e.message;
  }
}

// Returns contact with specific ID
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    return contacts.filter((obj) => obj.id === contactId);
  } catch (e) {
    return e.message;
  }
}

//   Removes contact
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    if (contacts.find((obj) => obj.id === contactId)) {
      await fs.writeFile(
        contactsPath,
        JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
      );
      return true;
    }
    return false;
  } catch (e) {
    return e.message;
  }
}

//   Adds new contact
async function addContact(body) {
  try {
    const contact = {
      id: nanoid(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (e) {
    return e.message;
  }
}

async function updateContact(id, body) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const oldContact = contacts.find((obj) => obj.id === id);
    const newContact = { ...oldContact, ...body };
    const newList = contacts.map((obj) => {
      if (obj.id === id) {
        return newContact;
      }
      return obj;
    });
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    return newContact;
  } catch (e) {
    return e.message;
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
