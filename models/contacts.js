const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
   
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const normId = String(contactId);
    const result = contacts.find((item) => item.id === normId);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const normId = String(contactId);
    const index = contacts.findIndex((item) => item.id === normId);
    if (index === -1) {
      return null;
    }
    const result = contacts.splice(index, 1)[0];
    await updateContacts(contacts);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};


const addContact = async ({name, email, phone}) => {
  const newId = uuidv4();
   const newContact = {
     id: newId,
     name,
     email,
     phone,
   };
  try {
    const contacts = await listContacts();
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }

};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
