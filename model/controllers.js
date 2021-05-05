const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const shortid = require("shortid");

//  Link on data base contacts.js
const contactsPath = path.join(__dirname, "../db/contacts.json");

// ---Getting contact list in console
function listContacts() {
  const data = fs.readFileSync(contactsPath, "utf-8");
  return JSON.parse(data);
}

// ---Getting contact by ID
async function getContactById(id) {
  const contacts = listContacts();
  const contact = contacts.find((con) => con.id === Number(id));
  return contact;
}

// ---Adding contact to contacts list
async function addContact({ name, email, phone }) {
  try {
    const contacts = listContacts();
    // Adding new contact to contacts list -------------------
    const id = shortid.generate();
    contacts.push({ id, name, email, phone });
    // -----------------------
    await fsPromises.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, "\t")
    );
    return { id, name, email, phone };
  } catch (err) {
    if (err) {
      console.log(err.message);
      return null;
    }
  }
}

// ---Removing contact
async function removeContact(id) {
  try {
    const contacts = listContacts();
    const deletedContact = contacts.find(
      (cont) => cont.id.toString() === id.toString()
    );
    if (!deletedContact) {
      console.log(`There is no contact with ID: ${id}`);
      return undefined;
    }
    const newContacts = contacts.filter(
      (contact) => contact.id.toString() !== id.toString()
    );
    await fsPromises.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, "\t")
    );
    return deletedContact;
  } catch {
    (err) => {
      if (err) {
        console.log(err.message);
      }
    };
  }
}

// --Update contact by ID
async function updateContact(id, body) {
  try {
    const contacts = listContacts();
    const updatedContact = Object.assign(
      contacts.find((cont) => cont.id.toString() === id.toString()),
      body
    );
    await fsPromises.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, "\t")
    );
    return updatedContact;
  } catch {
    (err) => {
      if (err) {
        console.log(err.message);
      }
    };
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
