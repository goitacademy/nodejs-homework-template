const fs = require('fs/promises');
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, './contacts.json');


const listContacts = async () => {
  try {
    const res = await fs.readFile(contactsPath);
    return JSON.parse(res);
} catch (error) {
    console.log(error.message);
}
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();    
    const res = contacts.find(item=>item.id===contactId);
    return res || null;
} catch (error) {
    console.log(error.message);
} 
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item=>item.id===contactId);
    if (index===-1){ return null }
    const [res] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return res;
} catch (error) {
    console.log(error.message);
}
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const contacts = await listContacts();
  
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
} catch (error) {
    console.log(error.message);
}
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item=>item.id===contactId);
    if (index===-1){ return null }
    const newContact = {
      ...contacts[index],
      ...body,
  }
  contacts.splice(index, 1, newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
  } catch (error) {
    
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
