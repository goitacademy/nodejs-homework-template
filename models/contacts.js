// const fs = require('fs/promises')
const { readFile, writeFile } = require("fs").promises;

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async () => {
  try{
const data = await readFile(contactsPath, 'utf8');
const contacts = JSON.parse(data);
return contacts;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
  

const getContactById = async (contactId) => {
try {
  const data = await readFile(contactsPath, 'utf8');
  const allContacts =JSON.parse(data);
  const contact = allContacts.find(({id}) => id === contactId);
  if (contact) return contact
  throw new Error("Contact not found");
}
catch (err) {
  console.log(err);
  throw err;
}};


const addContact = async (body) => {
try{
  const data = await readFile(contactsPath, 'utf8');
  const allContacts =JSON.parse(data);
  const updateContacts = [...allContacts, body];
  return writeFile(contactsPath, JSON.stringify(updateContacts));
}
catch (err) {
  console.error(err);
  throw err;
}
};


const removeContact = async (contactId) => {

  try{
    const data = await readFile(contactsPath, "utf8");
    const allContacts = JSON.parse(data);
    const contact = allContacts.find(({id}) => id === contactId);
    if (contact) {
      const updateContacts = allContacts.filter((contact) => {
        if (contact.id !== contactId) return contact;
        return null
      });
      return writeFile(contactsPath, JSON.stringify(updateContacts));
    }
    throw new Error("Not found");
  } catch (err) {
    console.error(err);
    throw err;
  }
};



const updateContact = async (contactId, body) => {
  try {
    const data = await readFile(contactsPath, "utf8");
    const allContacts = JSON.parse(data);
    const contactIndex = allContacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) throw new Error("Contact not found");

   const updatedContacts = allContacts.map((contact) => {
       if (contact.id === contactId) {
         return { ...contact, ...body };
       }
       return contact;
     });
   
    writeFile(contactsPath, JSON.stringify(updatedContacts));
    
    return updatedContacts[contactIndex];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
