const { v4 } = require("uuid");
const getAll = require("./listContacts");
const updateContacts = require("./updateAllContacts");

const addContact = async (data) => {
  try {
    const newContact = { ...data, id: v4() };
    const contacts = await getAll();

    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
  } catch (err) {
    return err.message;
  }
};

module.exports = addContact;
