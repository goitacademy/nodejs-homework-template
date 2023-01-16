const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "contacts.json");

const readData = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const updateContactsList = async (data) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
  }
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const contacts = await readData();

  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    return;
  }

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readData();

  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    return;
  }

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  updateContactsList(updatedContacts);

  return contact;
};

const addContact = async (body) => {
  const contacts = await readData();

  const isContactExist = contacts.some(
    (contact) => contact.name.toLowerCase() === body.name.toLowerCase()
  );

  if (isContactExist) {
    
    return;
  }

  const newContact = {
    id: shortid.generate(3),
    ...body,
  };

  const updatedContacts = [...contacts, newContact];

  updateContactsList(updatedContacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readData();

  const isContactExist = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (isContactExist === -1) {
    return;
  }

  console.log({ ...contacts[isContactExist], ...body });
  contacts[isContactExist] = { ...contacts[isContactExist], ...body };

  updateContactsList(contacts);

  return contacts[isContactExist];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
