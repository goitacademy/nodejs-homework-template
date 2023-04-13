const fs = require('fs/promises');
const path = require("path");

const { v4: uuidv4 } = require('uuid');




const contactsPath = path.join(__dirname, "../models/contacts.json");


const getListContacts = async () => {
  const listResult = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(listResult); 
 
}

const getContactById = async (contactId) => {
   const contacts = await getListContacts();
        const contactById = contacts.find((contact) => contact.id === contactId);
        if (!contactId) {
            return null;
        }
    return contactById;
}

const removeContact = async (contactId) => {
     
  const contacts = await getListContacts();
  const updatedContactList = contacts.filter(contact => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(updatedContactList));
 
  return updatedContactList;
}

const addContact = async ({name, email, phone}) => {
  const newContactItem = {
            id: uuidv4(),
            name,
            email,
            phone,
  };
  const contacts = await getListContacts();
  contacts.push(newContactItem);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContactItem;
}

const updateContact = async (contactId, body) => {
   const {
    name,
    email,
    phone
  } = body;

  const contacts = await getListContacts();
  contacts.forEach(contact => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    };
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  const updatedContact = getContactById(contactId);

  return updatedContact;
   
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}