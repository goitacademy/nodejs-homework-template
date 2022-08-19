const uniqid = require("uniqid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

function readContacts() {
  return fs.readFile(contactsPath, "utf8");
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
}

const listContacts = async () => {
  return JSON.parse(await readContacts());
};

const getContactById = async (contactId) => {
  return JSON.parse(await readContacts()).find((r) => r.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const newContacts = JSON.parse(contacts).filter((r) => r.id !== contactId);

  if (contacts.length === newContacts.length) {
    return { message: "contact is not found" };
  }

  writeContacts(newContacts);
};

const addContact = async ({ name, email, phone }) => {
  const contacts = JSON.parse(await readContacts());
  const newContact = { id: uniqid(), name, email, phone };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  let newContact = null;
  const contacts = JSON.parse(await readContacts());
  const newContacts = contacts.map((r) => {
    if (contactId !== r.id) {
      return r;
    } else {
      newContact = {
        contactId,
        name: name ?? r.name,
        email: email ?? r.email,
        phone: phone ?? r.phone,
      };
      return newContact;
    }
  });
  await writeContacts(newContacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
