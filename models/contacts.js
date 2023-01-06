const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function readContacts(path) {
  return JSON.parse(await fs.readFile(path));
}

async function writeContacts(contactArr) {
  await fs.writeFile(contactsPath, JSON.stringify(contactArr, null, 2));
}

const getContactsList = async () => {
  return await readContacts(contactsPath);
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await readContacts(contactsPath);
    const contact = contactsList.find(({ id }) => id === contactId);

    return contact || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await readContacts(contactsPath);

    const updatedContacts = await contactsList.filter(
      ({ id }) => id !== contactId
    );

    return await writeContacts(updatedContacts);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await readContacts(contactsPath);

    const newContact = { id: nanoid(), ...body };

    contactsList.push(newContact);

    await writeContacts(contactsList);

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContacts(contactsPath);

    const index = contacts.findIndex(({ id }) => id === contactId);

    const updatedContact = { ...contacts[index], ...body };

    contacts[index] = updatedContact;

    await writeContacts(contacts);

    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getContactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
