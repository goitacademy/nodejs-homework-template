const fs = require('fs/promises');
const path = require("path");
const { v4: uuidv4} = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');


async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data)
        
                        
        return contacts
    
}

async function getContactById(contactId) {
  
  const contacts = await listContacts();
  const currentContact = contacts.find(contact => contact.id === contactId.toString());
  
  return currentContact || null
}
    



async function removeContact(contactId) { 
   
        const contacts = await listContacts();
        const currentContact = contacts.find(contact => contact.id === contactId);
        
        if (currentContact) {
            const newContactList = contacts.filter(contact => contact.id !== contactId);
            await fs.writeFile(contactsPath, JSON.stringify(newContactList));
   
        
          return currentContact;
  }
  return null

}

async function addContact({ name, email, phone }) {
   
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  console.log(newContact)
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  if (!body) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };
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
