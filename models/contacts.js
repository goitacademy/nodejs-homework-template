const fs = require('fs/promises');
const path = require("path");
const { v4: uuid } = require("uuid");
const DB_PATH = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const data = await listContacts();
  const [contact] = data.filter((item) => item.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const data = await listContacts(); 
  const contacts = data.filter((item) => item.id !== contactId);
  await fs.writeFile(DB_PATH, JSON.stringify(contacts, "", 2));
  return {"message": "contact deleted"};
}

const addContact = async ({name, email, phone}) => {
  const data = await listContacts();
  console.log(typeof(data));
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };

  data.push(newContact);
  await fs.writeFile(DB_PATH, JSON.stringify(data, "", 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const data = await listContacts(); 
  const index = data.findIndex(item => item.id === contactId);
  
  const refreshedDB = data.map(item => {
    if (item.id !== contactId){
      return item;
    }
    for( const key in item) {
      if(body[key]) {
        item[key] = body[key];
      }
    }
    return item;
  })
  
  await fs.writeFile(DB_PATH, JSON.stringify(refreshedDB, "", 2));
   
  return refreshedDB[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
