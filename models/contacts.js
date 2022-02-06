const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath);
    const contactsListParse = JSON.parse(contactsList);
    return contactsListParse;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await fs.readFile(contactsPath);
    const contactsListParse = JSON.parse(contactsList);
    const contactByItem = await contactsListParse.filter((el) => {
      return el.id === contactId;
    });
    return contactByItem;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await fs.readFile(contactsPath);
    const contactsListParse = JSON.parse(contactsList);
    const isId = contactsListParse.some((el) => el.id === contactId);
    if (isId) {
      const contactsListWithoutItem = await contactsListParse.filter((el) => {
        return el.id !== contactId;
      });
      const rewriteContactsListWithoutItem = await fs.writeFile(
        contactsPath,
        JSON.stringify(contactsListWithoutItem)
      );
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
