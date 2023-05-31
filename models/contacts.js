const fs = require('fs/promises');
const contactsPath = require('path').join(__dirname, "contacts.json");
const {nanoid} = require("nanoid");


const listContacts = async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
}


const getContactById = async( id ) => {
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id === id);
    return contact || null;
}



const removeContact = async(id) => {
   const allContacts = await listContacts();
   const index = allContacts.findIndex(contact => contact.id === id);
   if (index === -1) {
      return null;
   }

   const [result] = allContacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
   return result;
}

const addContact = async (body) => {
   const allContacts =  await listContacts();
    const newContact = {
       id: nanoid(),
       ...body,
    }
    
    allContacts.push(newContact); 
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
}


const updateContact = async (id ,  body ) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);

    if (index === -1) {
     return null;
    }

    contacts[index] = {id, ...body };
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
