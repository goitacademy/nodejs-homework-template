const fs = require("fs/promises");
const path = require("path");

const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

 
// ================== function
// ============ to get complete list of a contacts from .json file 
const  listContacts = async () => {
  const data = await  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.log(error);
    }
  })
      const contactList = JSON.parse(data);
      return contactList;
}

// ===========function to Find Contact by Id  ====================

const getById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(
    contact => contact.id.trim() === contactId.toString());
  return contactById || null;
} 
  

// ===========function to Remove (Delete) Contact by Id  ====================

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) =>
    item.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return result;
};


// ====== function to add contact (push new Object to an array of Objects)

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};


// ===========function to Update(Change) Contact by Id  ====================

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (item) => item.id === contactId.toString()
  );
  if (index < 0) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};


// ==== export of functions

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
