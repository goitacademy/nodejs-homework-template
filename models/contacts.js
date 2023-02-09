const fs = require("fs/promises");
const path = require("path");

const contactsDir = path.join(__dirname, "..", "models", "contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsDir, (err, data) => {
      if (err) console.log(err);
      return data;
    });
    return JSON.parse(contactsList);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await fs.readFile(contactsDir, (err, data) => {
      if (err) console.log(err);
      return data;
    });
    const parsedData = JSON.parse(contactsList);
    return parsedData.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  let matchedContact = false;
  try {
    const contacts = await fs.readFile(contactsDir, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      return data;
    });
    const parsedData = JSON.parse(contacts);
    const updatedContacts = parsedData.filter(({ id }) => {
      if (id === contactId) {
        matchedContact = true;
      }
      return id !== contactId;
    });
    if (matchedContact) {
      await fs.writeFile(contactsDir, JSON.stringify(updatedContacts));
      return contactId;
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await fs.readFile(contactsDir, (err, data) => {
      if (err) console.log(err);
      return data;
    });
    const parsedData = JSON.parse(contacts);
    const createdId = parsedData.length + 1;
    const newContact = {
      id: createdId.toString(),
      ...body,
    };
    const updatedContacts = [...parsedData, newContact];
    await fs.writeFile(contactsDir, JSON.stringify(updatedContacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
const updateContact = async (contactId, body) => {
  let contactUpdated;
  try {
    const contacts = await fs.readFile(contactsDir, (err, data) => {
      if (err) console.log(err);
      return data;
    });
    const parsedData = JSON.parse(contacts);
    const updatedContacts = parsedData.map((contact) => {
      if (contact.id === contactId) {
        contactUpdated = {
          ...contact,
          ...body,
        };
        return contactUpdated;
      }
      return contact;
    });
    await fs.writeFile(contactsDir, JSON.stringify(updatedContacts));
    return contactUpdated;
  } catch (error) {
    console.log(error.message);
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
