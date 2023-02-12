const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("./models/contacts.json");

async function listContacts() {
  const listOfContacts = await fs.readFile(contactsPath, "UTF-8");
  return JSON.parse(listOfContacts);
}

async function getContactById(contactId) {
  const parsedContacts = await listContacts();

  const contact = parsedContacts.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const parsedContacts = await listContacts();

  const contactToBeDeleted = parsedContacts.find(({ id }) => id === contactId);
  const filteredContacts = parsedContacts.filter(
    (contact) => contact !== contactToBeDeleted
  );

  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));

  return contactToBeDeleted;
}

async function addContact({ name, email, phone }) {
  const parsedContacts = await listContacts();

  // Looking for the biggest id number (could be replaced by some id generator)
  let biggestId = 0;
  parsedContacts.map(({ id }) => (+id > biggestId ? (biggestId = +id) : null));
  const newContactID = biggestId + 1;

  const newContact = {
    id: newContactID.toString(), // Converting to String to save DB var's types from example
    name: name.toString(),
    email: email.toString(),
    phone: phone.toString(),
  };

  parsedContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(parsedContacts));

  return newContact;
}

async function updateContact(contactId, body) {
  const parsedContacts = await listContacts();
  let updatedContact = false;

  //  У цьому випадку фор використаний для переривання проходження по масиву, після знаходження потрібного контакту, адже якщо потрібний контакт буде першим у списку, немає потреби проходитись по тисячях наступних контактів.
  for (let i = 0; i < parsedContacts.length; i++) {
    if (parsedContacts[i].id === contactId) {
      parsedContacts[i] = { ...parsedContacts[i], ...body };
      updatedContact = parsedContacts[i];
      fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
      return updatedContact;
    }
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};