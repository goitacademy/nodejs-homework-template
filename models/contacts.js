const fs = require('fs/promises')
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
}
    
    

const getContactById = async (id) => {
    const contactId = String(id);
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);

    return result || null;
}

const removeContact = async (id) => {
  // const contactId = String(id);
  //   const contacts = await listContacts();
  //   const index = contacts.findIndex(item => item.id === contactId);
  //   if (index === -1) {
  //       return null;
  //   }

  //   const [result] = contacts.splice(index, 1);
  //   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  //   return result;
}

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContacts = {
        id: uuidv4(),
        name,
        email,
        phone      
    } 
    contacts.push(newContacts);          

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContacts; 
}

const updateContact = async (id, { name, email, phone }) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
