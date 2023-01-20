const fs = require('fs/promises')
const path = require("path");

const contactsPath = path.join(__dirname,"/contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);   
     return JSON.parse(contacts);    
  } catch (error) {
    console.error("listContacts", error);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => String(item.id) === String(contactId));   
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.error("getContactById", error);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const listAfterDelete = contacts.filter(item => item.id !==contactId);
    if(contacts.length === listAfterDelete.length) {
      console.log("User not found");
      return null;
    }    
    await fs.writeFile(contactsPath, JSON.stringify(listAfterDelete));
    return contactId;
  } catch (error) {
    console.error("removeContact", error);
  }
}

const addContact = async (data) => {
  try {
    const contacts = await listContacts();    
    contacts.push(data);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return data;
  } catch (error) {
    console.error("addContact", error);
  }
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    console.log("User not found");
    return null;
  }
  contacts[index] = {...contacts[index], ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}