const fs = require("fs").promises;
const path = require("path");
const { v4: id } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
    const parsedContacts = await listContacts();

    const [contactById] = parsedContacts.filter(({ id }) => id === contactId);

    if (contactById.length === 0) {
      return null;
    }

    return contactById;

}

const removeContact = async (contactId) => {
    const parsedContacts = await listContacts();

    const newList = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );

    if (parsedContacts.length === newList.length) {
      return null;
    }
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newList, null, "\t"),
      "utf8"
    );

    const contactsAfterRemove = await fs.readFile(contactsPath, "utf8");

    return JSON.parse(contactsAfterRemove);
}

const addContact = async (body) => {
  const newContact = { ...body, id: id()};

    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    const newList = [...parsedContacts, newContact];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newList, null, "\t"),
      "utf8"
    );
    
    return newContact;
}

const updateContact = async (contactId, body) => {

  const contacts = await listContacts();

  const contactToUpdateIndex = contacts.findIndex(({id}) => id === contactId);

  if (contactToUpdateIndex < 0) {
    return null;
  }

  let contactToUpdate = contacts[contactToUpdateIndex];
  contacts[contactToUpdateIndex] = {...contactToUpdate, ...body}

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, "\t"),
    "utf8"
  );

  return contacts[contactToUpdateIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} 
