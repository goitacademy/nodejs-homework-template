const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
} catch(err) {
    console.error(err);
}
};

const getContactById = async (contactId) => {
  const data  = await listContacts();
    return data.find(x => x.id === contactId);
    
};

const removeContact = async (contactId) => {
  const data  = await listContacts();
  const newData = data.filter(x => x.id !== contactId);
 await fs.writeFile(contactsPath, JSON.stringify(newData), 'utf8');
 return data.length !== newData.length;
};

const addContact = async (body) => {
  
    
try {
    const data = await listContacts();
    const newData = [...data, body];
    await fs.writeFile(contactsPath, JSON.stringify(newData), 'utf-8');


return body;
} catch(err) {
    console.error(err);
}
};

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const elemById = data.find((elems) => elems.id === contactId);
    elemById.name = body.name;
    elemById.email = body.email;
    elemById.phone = body.phone;
    await fs.writeFile(contactsPath, JSON.stringify(data), 'utf8');
    return elemById;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
