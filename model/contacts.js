const fs = require("fs/promises");

const { v4: uuidv4 } = require("uuid");

const path = require("path");

const contactPath = path.join(__dirname, "./contacts.json");

// const contacts = require("./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data).find((contact) => contact.id === Number(contactId));
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data);
  const contactsFiltered = contacts.filter(
    (contact) => contact.id !== Number(contactId)
  );
  if (contactsFiltered.length === contacts.length) {
    console.log(`Contact with ID ${contactId} don't exist!`);
    return;
  }
  fs.writeFile(contactsPath, JSON.stringify(usersFiltered, null, "\t"));
};

const addContact = async (body) => {
  const id = uuidv4();
  const record = {
    id,
    ...body,
  };
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data);
  contacts.push(record);
  fs.writeFile(contactsPath, JSON.stringify(users, null, "\t"));
  return record;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactPath);

  const contacts = JSON.parse(data);

  const contact = contacts.find((contact) => contact.id === Number(contactId));

  const updatedContact = { ...contact, ...body };

  contacts.forEach((item, i) => {
    if (item.id === Number(contactId)) contacts[i] = updatedContact;
  });

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));

  return updatedContact.id ? updatedContact : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
