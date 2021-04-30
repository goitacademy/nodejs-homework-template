const path = require("path");
const fs = require("fs");
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
  const contacts = listContacts();
  // Adding new contact to contacts list -------------------
  const id = shortid.generate();
  contacts.push({ id, name, email, phone });
  // -----------------------
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, "\t"),
    (err) => {
      if (err) {
        console.log(err.message);
        return null;
      }
    }
  );
  return { id, name, email, phone };
}

// ---Removing contact
async function removeContact(id) {
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
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, "\t"),
    (err) => {
      if (err) {
        console.log(err.message);
      }
    }
  );
  return deletedContact;
}

// --Update contact by ID
async function updateContact(id, body) {
  const contacts = listContacts();
  try {
    const updatedContact = Object.assign(
      contacts.find((cont) => cont.id.toString() === id.toString()),
      body
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, "\t"),
      (err) => {
        if (err) {
          console.log(err.message);
        }
      }
    );
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
