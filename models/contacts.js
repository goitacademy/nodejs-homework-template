const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname,'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const addContact = async ({name, email, phone}) => {
  const data = await listContacts();
  const obj = {
    id : nanoid(),
    name,
    email,
    phone,
  };
  data.push(obj);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return obj;
};

const getContactById = async id => {
  const data = await listContacts();
  const result = data.find(contact => contact.id === id);
  return result ? result : null;
};

const removeContact = async id => {
  const contact = await getContactById(id);

  if (contact) {
    const data = await listContacts();
    const result = data.filter(contact => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(result));
    return contact;
  }
  return null;
}

const updateContact = async (id,{name,email,phone}) =>{
  const contacts = await listContacts()
  const idx = contacts.findIndex(item =>item.id === id);
  if (idx === -1) {
    return null
    
  }
  contacts[idx]= {id,name,email,phone}
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx]

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
