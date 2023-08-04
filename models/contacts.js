const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function findFile() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const listContacts = async () => {
  try {
    return await findFile();
  } catch (e) {
    console.log(e.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await findFile();
    const findContact = contacts.find((contact) => contact.id === contactId);
    return findContact || null;
  } catch (e) {
    console.log(e.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await findFile();
    const findIndexContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (findIndexContact === -1) {
      return null;
    }

    const [result] = contacts.splice(findIndexContact, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return result;
  } catch (e) {
    console.log(e.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await findFile();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (e) {
    console.log(e.message);
  }
};

// const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact,
};
