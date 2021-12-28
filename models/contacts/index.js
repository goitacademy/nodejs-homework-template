const { v4: uuidv4 } = require("uuid");

const fs = require('fs/promises')
const path = require("path");

// const contacts = require('./contacts.json')

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Can't get contacts list!", error.message);
  }
}

const getById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      ({ id }) => id.toString() === contactId.toString()
    );
    return contact;
  } catch (error) {
    console.error("Something wrong!", error.message);
  }
}

const addContact = async ({name,
    email,
    phone,}) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  const updatedContactList = [...contacts, newContact].sort(
    (a, b) => a.id - b.id
  );
  const normalizedNewContacts = JSON.stringify(updatedContactList);
  fs.writeFile(contactsPath, normalizedNewContacts);
  console.log(
    `Contact: ${JSON.stringify(newContact.name)} was successfully added!`
  );
  return newContact;
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const isNeedToRemove = contacts.find(
      ({ id }) => id.toString() === contactId.toString()
    );
    if (!isNeedToRemove) {
      return;
    }
    const editedContactList = contacts.filter(
      ({ id }) => id.toString() !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(editedContactList));
    console.log(`Contact with ID: ${contactId} was successfully removed!`);
    return {message: `Contact with ID: ${contactId} was successfully removed!`};
  } catch (error) {
      console.error("Something wrong! Try again later!", error);
  }
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const updatedContactList = [];
    contacts.forEach(item => {
    if (item.id === contactId.toString()) {
      updatedContactList.push(body)
    } else {
      updatedContactList.push(item)
    }
    })
    await fs.writeFile(contactsPath, JSON.stringify(updatedContactList))
    return getById(contactId);
}

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
}
