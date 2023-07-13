const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(result);
  } catch (error) {
    return null;
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const result = data.find((el) => el.id === contactId);
    return result;
  } catch (error) {
    return null;
  }
}

async function removeContact(contactId) {
  const data = await listContacts();
  const contactIndex = data.findIndex((el) => el.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const [result] = data.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  try {
    const data = await listContacts();
    const id = nanoid().toString();
    const newContact = { id, name, email, phone };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

    return newContact;
  } catch (error) {
    return null;
  }
}

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const data = await listContacts();
    const contactIndex = data.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) {
      return null;
    }
    const editContact = {
      id: contactId,
      name,
      email,
      phone,
    };
    data[contactIndex] = editContact;
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

    return editContact;
  } catch (error) {
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
