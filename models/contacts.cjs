const fs = require('fs/promises')
const path = require("path");
 const { uid } = require("uid");


const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactsRaw);
  console.log(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  try {
   const findContact = contacts.find((contact) => contact.id === contactId);
  console.log(findContact);
  return findContact;
  } 
  catch {
    console.error('error')
  }
};

const removeContactById = async (contactId) => {
  const contacts = await listContacts();
  try {
   const contactRemove = contacts.find((contact) => contact.id === contactId);
  if (!contactRemove) {
    return null;
  }
  const newContact = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContact));
  console.log(contactRemove);
  return contactRemove;
  }
  catch {
     console.error('error')
 } 
};
const addContact = async (body) => {
  const contacts = await listContacts();
 
  try {
   const { name, email, phone } = body;
  const id = uid();
  const newContact = { id, name, email, phone };
  
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(newContact);
  return newContact;
 }  catch {
    console.error('error')
  }
};

const updateContact = async (contactId, body) => {
  try {
   const { name, email, phone } = body;
  const contacts = await listContacts();
  const [contactToUpdate] = contacts.filter((item) => item.id === contactId);
  contactToUpdate.name = name;
  contactToUpdate.email = email;
  contactToUpdate.phone = phone;
  const newContacts = [...contacts];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  console.log(contactToUpdate);
  return contactToUpdate;
 } catch {
    console.error('error')
  } 
};

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContact,
};
