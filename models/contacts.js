const { v4: uuidv4 } = require("uuid");

const fs = require("fs").promises;
const path = require("path");
const { parseText, stringifyText } = require("../helpers/helpersJSON");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  if (contacts) {
    const parsedContactsList = parseText(contacts);
    return parsedContactsList;
  }
  return null;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();

  if (allContacts) {
    const contact = allContacts.find((contact) => contact.id === contactId);
    return contact;
  }
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  let removedContact;

  if (allContacts) {
    const contactIndex = allContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex !== -1) {
      removedContact = allContacts[contactIndex];
      allContacts.splice(contactIndex, 1);
    }
  }

  writeTextToFile(allContacts);
  return removedContact || null;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  writeTextToFile([...allContacts, newContact]);

  return newContact;
};

const updateContact = async ({ contactId, name, phone, email }) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }
  contacts.splice(contactIndex, 1, { id: contactId, name, email, phone });
  writeTextToFile(contacts);
  return { id: contactId, name, email, phone };
};

async function writeTextToFile(text) {
  try {
    await fs.writeFile(contactsPath, stringifyText(text));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
