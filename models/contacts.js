const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const writeFileContacts = async (contact) => {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  try {
    const normalizeData = JSON.parse(data);
    return normalizeData;
  } catch (error) {
    console.log(error.message);
  }
};
const getContactById = async (contactId) => {
  const contacts = await fs.readFile(contactsPath);
  try {
    const normalizeData = JSON.parse(contacts);
    const result = normalizeData.find(
      ({ id }) => parseInt(id) === parseInt(contactId)
    );
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const [result] = contacts.splice(idx, 1);
    console.log(`Contact with id=${contactId} was removed`);
    writeFileContacts(contacts);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = body;
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const newContacts = [...contacts, newContact];
    writeFileContacts(newContacts);
    console.log(`Contact with name="${name}" was added to database.`);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();

    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const { name, email, phone } = body;
    contacts[idx] = { id: contactId, name, email, phone };
    writeFileContacts(contacts);
    console.log(`Contact with name="${name}" was update to database.`);
    return contacts[idx];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
