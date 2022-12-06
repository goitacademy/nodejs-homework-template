const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const result = await JSON.parse(contacts);
  return result;
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const [result] = await contacts.filter(
      (item) => Number(item.id) === contactId
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
