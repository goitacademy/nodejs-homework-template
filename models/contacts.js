const { readFile, writeFile } = require("fs/promises");
const path = require("path");



const contactFile = path.join(__dirname,'contacts.json')

const listContacts = async () => {
  const contacts = await readFile(contactFile,'utf-8');
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts =  await listContacts();
  const searchedContact = contacts.find(item => item.id === contactId);
  return searchedContact || null;
}

const removeContact = async (contactId) => {
  const contacts =  await listContacts();
  const itemToDelete = contacts.find(item=>item.id === contactId);
  if(!itemToDelete){
    return null;
  }
  const deletededContact = contacts.filter(item => item.id !== contactId);
  await writeFile(contactFile,JSON.stringify(deletededContact))
  return deletededContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const { nanoid } = await import("nanoid");
  const {name,email,phone} = body;
  const newContact = {
    id:nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  await writeFile(contactFile,JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  if (name) {
    allContacts[index].name = name;
  }
  if (email) {
    allContacts[index].email = email;
  }
  if (phone) {
    allContacts[index].phone = phone;
  }
  await writeFile(contactFile, JSON.stringify(allContacts));
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
