const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

// Function from parse
function parseContacts(data) {
  return JSON.parse(data.toString());
}

// Get contacts list 
const listContacts = async () => {

  const list = await fs.readFile(contactsPath, 'utf-8'); 
  return parseContacts(list);
}

// Get a contact with an ID
const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);

  return result || null;
}


// Remove a contact
const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(item => item.id === contactId);

    if(index === -1){
        return null;
  }
  
    const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
    return result;


}

// Add a new contact
const addContact = async (body) => {
  const contacts = await listContacts();

   const newContact = {
    id: nanoid(),
    ...body
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact;

}

// Update an existing contact
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(item => item.id === contactId);
  
    if(index === -1){
        return null;
  }
  
  contacts[index] = { contactId, ...body };
  
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}


// Export functions
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
