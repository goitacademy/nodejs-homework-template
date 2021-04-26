const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

//  Link on data base contacts.js

const contactsPath = path.join(__dirname, "../../db/contacts.json");

// ---Getting contact list in console
function listContacts() {
  const data = fs.readFileSync(contactsPath, "utf-8");
  return JSON.parse(data);
}

// ---Getting contact by ID
async function getContactById(id) {
  const contacts = await listContacts();
  const contact = contacts.find((con) => con.id === Number(id));
  return contact;
}

// ---Adding contact to contacts list
async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  // Adding new contact to contacts list -------------------
  const id = shortid.generate();
  contacts.push({ id, name, email, phone });
  // -----------------------
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"), (err) => {
    if (err) {
      console.log(err.message);
      return null;
    }
  });
  return { id, name, email, phone };
}

// ---Removing contact
async function removeContact(id) {
  const contacts = await listContacts();
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
  fs.writeFile(contactsPath, JSON.stringify(newContacts, null, "\t"), (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
  });
  return deletedContact;
}

// --Update contact by ID
async function updateContact(id, body) {
  const contacts = await listContacts();
  try {
    const updatedContact = Object.assign(
      contacts.find((cont) => cont.id.toString() === id.toString()),
      body
    );
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"), (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
    });
    return updatedContact;
  } catch {
    return undefined;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
