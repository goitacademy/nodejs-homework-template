const fs = require("fs/promises");
const path = require("path");

// path to file
const filePath = path.join(__dirname, "./contacts.json");

// function wotch all list contacts
const listContacts = async () => {
  const allContacts = await fs.readFile(filePath, { encoding: "utf8" });
  const parseList = JSON.parse(allContacts);
  return parseList;
};

// function get contact  by id
const getContactById = async (contactId) => {
  const contactsList = await listContacts();

  const getIdContact = contactsList.find((item) => item.id === contactId);

  return getIdContact;
};

const writeContact = async (contact) => {
  await fs.writeFile(filePath, JSON.stringify(contact, null, 2));
};

// function remove contact  by id
const removeContact = async (contactId) => {
  const contactsList = await listContacts();

  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contactsList.splice(idx, 1);

  await writeContact(contactsList);

  return removeContact;
};

const addContact = async (body) => {
  const contactsList = await listContacts();
  contactsList.push(body);

  await writeContact(contactsList);

  return body;
};

// function update contact
const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();

  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  } else {
    contactsList[idx] = { id: contactId, ...body };

    await writeContact(contactsList);

    return contactsList[idx];
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
