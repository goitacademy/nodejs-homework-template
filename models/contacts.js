const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsDirection = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsDirection);

    return JSON.parse(result);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const result = allContacts.find((item) => item.id === contactId);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contactIndex = allContacts.findIndex((item) => item.id === contactId);
    console.log(contactIndex);
    if (contactIndex === -1) {
      return null;
    }
    const deletedContact = allContacts.splice(contactIndex, 1);
    await fs.writeFile(contactsDirection, JSON.stringify(allContacts, null, 2));
    return deletedContact;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const allContacts = await listContacts();
    allContacts.push({ id: nanoid(), ...body });

    await fs.writeFile(contactsDirection, JSON.stringify(allContacts, null, 2));
    return body;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const id = nanoid();
    const updatedContacts = allContacts.map((item) => {
      if (item.id === contactId) {
        return (item = { id: id, ...body });
      }
      return item;
    });
    const updatedContact = updatedContacts.find((item) => item.id === id);
    console.log(updateContact);
    await fs.writeFile(
      contactsDirection,
      JSON.stringify(updatedContacts, null, 2)
    );
    return updatedContact;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
