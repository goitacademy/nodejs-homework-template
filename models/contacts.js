const fs = require('fs/promises')
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname,"/contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath);
    // console.table(JSON.parse(response))
     return JSON.parse(response);    
  } catch (error) {
    console.error("listContacts", error);
  }
}

const getContactById = async (contactId) => {
  try {
    const ListContacts = await listContacts();
    const contact = ListContacts.filter((item) => item.id === contactId);
    // console.log("getContactById",contact);
    return contact;
  } catch (error) {
    console.error("getContactById", error);
  }
}

const removeContact = async (contactId) => {
  try {
    const ListContacts = await listContacts();
    const ListAfterDelete = ListContacts.filter(item => item.id !==contactId)
    // console.table(ListAfterDelete);
    await fs.writeFile(contactsPath, JSON.stringify(ListAfterDelete));
    return contactId;
  } catch (error) {
    console.error("removeContact", error);
  }
}

const addContact = async (body) => {
  try {
    const ListContacts = await listContacts();
    const contact = {
      id: uuidv4(),
      ...body
    }
    ListContacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(ListContacts));
    return contact;
  } catch (error) {
    console.error("addContact", error);
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}