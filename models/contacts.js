const fs = require("fs/promises")
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json")
const { v4 } = require('uuid');

const listContacts = async () => {
   const data =await fs.readFile(contactsPath);
   const contacts=JSON.parse(data);
   return contacts;
  }
  
  const getContactById = async id => {
   const contacts =await listContacts();
   const result =contacts.find(contact =>contact.id===id);
   if (!result){
       return null;
   }
   return result;
  }
    
  const addContact=async (name, email, phone) => {
    const contacts =await listContacts();
    const newContact={id:v4(),name,email,phone};
    contacts.push(newContact);
    await fs.writeFile(contactsPath,JSON.stringify(contacts));
    return newContact
  }

  const removeContact= async (id) =>{
    const contacts =await listContacts();
    const idx =contacts.findIndex(contact=>contact.id===id);
    if(idx===-1){
        return null
    }
    const [deleteContact]=contacts.splice(idx,1)
    await fs.writeFile(contactsPath,JSON.stringify(contacts))
    return deleteContact

  }


const updateContact = async (id,name,email,phone) => {
  const contacts =await listContacts();
  const idx = contacts.findIndex(contact => contact.id === id);
  if(idx === -1){
      return null;
  }
  contacts[idx] = {id,name,email,phone};
  await fs.writeFile(contactsPath,JSON.stringify(contacts))
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
