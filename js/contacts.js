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
    console.log(contacts.toString());
    return;
  } catch (e) {
    return e.message;
  }
}

// Returns contact with specific ID
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    console.log(contacts.filter((obj) => obj.id === contactId));
    return;
  } catch (e) {
    return e.message;
  }
}

//   Removes contact
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
    );
    return;
  } catch (e) {
    return e.message;
  } finally {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    if (contacts.filter((contact) => contact.id === contactId)) {
      console.log("Contact have been deleted.");
    } else {
      console.log("Something went wrong.");
    }
  }
}

//   Adds new contact
async function addContact(name, email, phone) {
  try {
    if (!name || !email || !phone) {
      console.log("Please add all information");
      !name && console.log("You are missing name");
      !email && console.log("You are missing email");
      !phone && console.log("You are missing phone");
      return;
    }
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    contacts.push({ id: nanoid(), name: name, email: email, phone: phone });
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log("Contact have been added.");
    return;
  } catch (e) {
    return e.message;
  }
}

export { listContacts, getContactById, removeContact, addContact };
