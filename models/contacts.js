const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

async function getContacts() {
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts);
  };
  
async function getContactById(contactId) {
    const allContacts = await getContacts();
    const oneContact = allContacts.find(contact => contact.id === contactId);
    return oneContact || null ;
  };

  async function removeContact(id)  {
      const contacts = await getContacts();
      const index = contacts.filter(item => item.id === id);
      if(index === -1){
          return null;
      }
      const [result] = contacts.splice(index, 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return result;
  }
  
  
  async function addContact({name, email, phone}) {
    const allContacts = await getContacts();
    const newContact = { id: nanoid(), name, email, phone };
    allContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  };

 async function updateById(id, data) {
    const contacts = await getContacts();
    const index = contacts.filter(item => item.id === id);
    if(index === -1){
        return null;
    }
    contacts[index] = {id, ...data};
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact,
    updateById,
}
