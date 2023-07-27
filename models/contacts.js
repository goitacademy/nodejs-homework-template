const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid');

const listContacts = async () => {
  const contactList = await fs.readFile("models/contacts.json");
  return JSON.parse(contactList.toString());
}

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const filteredContact = contactList.filter(
    (contact) => contact.id === contactId
  );
  return filteredContact;
}

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  
  const filteredContacts = contactList.filter(contact => contact.id !== contactId)
  if (filteredContacts.length<contactList.length){
    await fs.writeFile("models/contacts.json", JSON.stringify(filteredContacts));
    return "Contact deleted";
  }else{
    return "Not found";
  }
  
  
  
}

const addContact = async (body) => {
  const contactList = await listContacts();
  body.id = uuidv4();
  contactList.push(body);
 
  await fs.writeFile("models/contacts.json", JSON.stringify(contactList));
  
  return "Contact Successfully added to the contact list";
}

const updateContact = async (contactId, body) => {
  let contactList = await listContacts();
  const indexFound = contactList.findIndex(contact => contact.id === contactId);
  if (indexFound === -1) {
    return "Not found"
  }
  if(body.phone) {
  contactList[indexFound].phone = body.phone;
  }
  if (body.email) {
    contactList[indexFound].email = body.email;
  }
  if (body.name) {
    contactList[indexFound].name = body.name;
  }
  await fs.writeFile("models/contacts.json", JSON.stringify(contactList));
  return "updated contact"
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
