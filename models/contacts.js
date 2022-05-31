const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid");
const PATH = path.join(__dirname, "./contacts.json");

const listContacts = async () => JSON.parse(await fs.readFile(PATH, "utf-8"));

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === contactId);

  if (contact) {
    return contact;
  } else {
    return null;
  }
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const contact = data.findIndex((contact) => contact.id === contactId);

  if (contact !== -1) {
    data.splice(contact, 1);
    await fs.writeFile(PATH, JSON.stringify(data));
    return data;
  }
};

const addContact = async (body) => {
  const { name, number, email } = body;
  const contactsList = await listContacts();
  const newContact = {
    id: uuid.v4(),
    name,
    number,
    email,
  };

  contactsList.push(newContact);

  await fs.writeFile(PATH, JSON.stringify(contactsList));
  return contactsList;
};

const updateContact = async (contactId, body) => {
  const { name, number, email } = body;
  const data = await listContacts();
  const handledContact = data.findIndex((contact) => contact.id === contactId);
  if (handledContact !== -1) {
    data[handledContact].name = name;
    data[handledContact].number = number;
    data[handledContact].email = email;

    await fs.writeFile(PATH, JSON.stringify(data));
    return data[handledContact];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
