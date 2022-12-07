const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const dataString = await fs.readFile(contactsPath);
    const data = JSON.parse(dataString);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find(({ id }) => id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(({ id }) => id === contactId);
    const deletedContact = allContacts[index];
    if (index === -1) {
      return null;
    }
    allContacts.splice(index, 1);
    await updateContacts(allContacts);
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  const newContact = {
    id: nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  try {
    const allContacts = await listContacts();
    allContacts.push(newContact);
    await updateContacts(allContacts);
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }

  allContacts[index] = { id: contactId, ...body };
  await updateContacts(allContacts);
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
