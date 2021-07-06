const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const contacts = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(contacts);
    const result = JSON.parse(response);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const response = await fs.readFile(contacts);
    const result = JSON.parse(response);
    const findContact = result.find(({ id }) => id.toString() === contactId);

    return findContact || "contact is not found";
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const response = await fs.readFile(contacts);
    const result = JSON.parse(response);
    const newContactsList = result.filter(
      ({ id }) => id.toString() !== contactId
    );

    fs.writeFile(contacts, JSON.stringify(newContactsList), (error) => {
      if (error) throw error;
    });

    return newContactsList.length !== result.length
      ? `contact with id ${contactId} removed `
      : "contact is not found";
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const response = await fs.readFile(contacts);
    const result = JSON.parse(response);
    const newContact = { id: shortid.generate(), ...body };
    result.push(newContact);

    fs.writeFile(contacts, JSON.stringify(result), (error) => {
      if (error) throw error;
    });

    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  const response = await fs.readFile(contacts);
  const result = JSON.parse(response);
  const update = result.map((contact) => {
    return contact.id.toString() === contactId
      ? { id: contact.id, ...body }
      : contact;
  });

  fs.writeFile(contacts, JSON.stringify(update), (error) => {
    if (error) throw error;
  });

  return body.name;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
