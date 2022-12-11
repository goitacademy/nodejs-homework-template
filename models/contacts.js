const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");
const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);

  } catch (err) {
    console.error("Error:", err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const resault = contacts.find((item) => item.id === `${contactId}`);

    return resault || null;
  } catch (err) {
    console.error("Error:", err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === `${contactId}`);
    if (index === -1) {
      return null;
    }
    const [resault] = contacts.splice(index, 1);
    await updateContacts(contacts);

    return resault;
  } catch (err) {
    console.error("Error:", err);
  }
};

const addContact = async ({name, email, phone}) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
  } catch (err) {
    console.error("Error:", err);
  }
};

const updateContact = async (contactId, data) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }

    contacts[index] = {id: `${contactId}`, ...data};
    await updateContacts(contacts);
    return contacts[index];
  }
  catch (err) {
    console.error("Error:", err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
