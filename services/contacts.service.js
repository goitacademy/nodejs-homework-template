const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const relativePath = "../data/contacts.json";
const contactsPath = path.join(__dirname, relativePath);

// console.log(__dirname);
// console.log(contactsPath);

const listContacts = async () => {
  const jsondata = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(jsondata);
  return parsedData;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const searchedContact = contacts.find((contact) => contactId === contact.id);
  console.log(searchedContact);
  return searchedContact;
};

const removeContact = async (contactId) => {
  console.log("delete test", contactId);
  const contacts = await listContacts();
  console.log("l", contacts.length);
  const removedContact = contacts.find((contact) => contact.id === contactId);
  const filteredList = contacts.filter((contact) => contact.id !== contactId);
  console.log("l2", filteredList.length);
  await fs.writeFile(contactsPath, JSON.stringify(filteredList));
  console.log("deleted contact:", removedContact);
  return filteredList;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  const updatedList = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedList));
  console.log("added new contact:", newContact);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const updatedContactList = contacts.map((el) => {
    if (el.id === contactId) {
      const updatedContact = {
        id: contactId,
        name: name,
        email: email,
        phone: phone,
      };
      return updatedContact;
    } else {
      return el;
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(updatedContactList));
  console.log("updated contact:", updatedContactList);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
