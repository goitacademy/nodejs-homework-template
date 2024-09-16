const fs = require('fs/promises')

const path = require("path");
const { v4: uuidv4 } = require('uuid');


const contactsPath = path.join(__dirname, "contacts.json")


const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)}

const getContactById = async(id) => {
  const contacts = await listContacts();
  const result  = contacts.find(item => item.id === id)
  return result || null;
}
const removeContact = async (id) => {  
  const contacts = await listContacts();
  const index  = contacts.findIndex(item => item.id === id)
  if (index === -1) {
      return null;
  }
  const [contactById] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contactById}

const addContact = async ({name,email, phone}) => {
  const contacts = await listContacts();
    const newContact = {
        id: uuidv4(),
        name,
        email, 
        phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateContact = async (id, data) => {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    contacts[index] = {id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

  
 
