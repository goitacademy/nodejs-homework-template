const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('models', 'contacts.json');

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const randomPart = Math.floor(Math.random() * 1000);
  return `${timestamp}${randomPart}`;
}

async function listContacts() {
const data=await fs.readFile(contactsPath, 'utf-8');

return JSON.parse(data);

}
  
async  function getContactById(contactId) {

  const contacts = await listContacts();
  const contact =contacts.filter(contact=> contact.id===contactId);
return contact || null;


  }
  
 async function removeContact(contactId) {

 
      const contacts = await listContacts();
      const deletedContact =contacts.filter(contact=> contact.id===contactId);
      return deletedContact || null
  }
  
 async function addContact(name, email, phone) {

    const contacts = await listContacts();
    const newContact = { id: generateUniqueId(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

  async function updateContact(contactId, updatedContact) {
    const contacts = await listContacts();

    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
  
    if (contactIndex !== -1) {
    contacts[contactIndex] = { ...contacts[contactIndex], ...updatedContact };
     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
    } else {
     
      return null;
    }
  }
  

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
