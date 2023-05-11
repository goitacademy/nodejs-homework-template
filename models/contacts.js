const fs = require('fs/promises')
const path = require('path') 
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data); 
}
    
const getById = async (contactId) => {
 const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

const  removeContact =  async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex(
    (item) => item.id === contactId || item.contactId === contactId
  );
        if(index === -1){
        return null;
        }
    const [result] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
}

const addContact = async (body) => {
   const data = await listContacts();
    const newContact = await {  
      id: nanoid(),
      ...body,
    }
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
}

const updateContact = async (contactId, body) => {
  const data = await listContacts();
 const indexContact = data.findIndex(
    (item) => item.id === contactId || item.contactId === contactId
  );
  if (indexContact === -1) {
    return null;
  }
  data[indexContact] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[indexContact];
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
