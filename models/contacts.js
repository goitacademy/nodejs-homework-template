const fs = require('fs/promises')
const { v4: uuidv4 } = require("uuid");

// Service
const contactsPath = "models/contacts.json"

const listContacts = async () => {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList.toString());
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
  // const contacts = await listContacts();
  // const newListContacts = contacts.filter(contact =>contact.id !== contactId );
  // const contacList = await fs.writeFile(contactsPath, JSON.stringify(newListContacts), (err)=>{
  //   if(err) console.err(err);
  // }).then(() => `Contact with id ${contactId} was successfully removed.`)
  // return contacList;
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    // id: String(contacts.length + 1),
    id: uuidv4(),
    name,
    email,
    phone,
  }
  const contactList = JSON.stringify([...contacts, newContact], null, 2)
  await fs.writeFile(contactsPath, contactList)
  return newContact
//   const addContact = {id: uuidv4(), ...body};
//   contacts.push(addContact);
//   const contacList = await fs.writeFile(contactsPath, JSON.stringify(contacts), (err)=>{
//     if(err) console.err(err);
//   }).then(() => `Contact was successfully created.`);
//   return contacList;
}

const updateContact = async (contactId, { name, phone, email }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
  const [contact] = contacts.filter((el) => el.id === contactId)

  if (!contact) {
    return null
  }
  if (name) {
    contact.name = name
  }
  if (phone) {
    contact.phone = phone
  }
  if (email) {
    contact.email = email
  }

  const [result] = contacts.splice(index, 1, contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
  // const contacts = await listContacts();
  // const [contact] = contacts.filter(contact => contact.id === contactId);
  // contact.name = body.name;
  // contact.email = body.email;
  // contact.phone = body.phone;
  // const contacList = await fs.writeFile(contactsPath, JSON.stringify(contacts), (err)=>{
  //   if(err) console.err(err);
  // }).then(() => `Contact was successfully updated.`);
  // return contacList;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}