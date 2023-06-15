const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactPath = path.join(process.cwd(), "db",  "contacts.json");

const getContactsService = async () => {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
};

const getContactByIdService = async (id) => {
  const contacts = await getContactsService();
  return await contacts.find(contact => contact.id === id) || null ;
};

const addContactService = async (data) => {
  const contacts = await getContactsService();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  console.log(newContact)
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContactService = async (id, data) => {
  const contacts = await getContactsService();
  const contact = contacts.findIndex((contact) => contact.id === id);
  if(!contact){
    return null;
  };
  console.log(data);
  contacts[contact] = {id, ...data};
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

return contacts[contact];
};

const removeContactService = async (id) => {
  const contacts = await getContactsService();
  const index= contacts.findIndex((contact) => contact.id === id);
  if(index === -1){
    return null;
  };
  contacts.slice(index, ({index} + 1));
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

  return id;
 
};
module.exports = {
  getContactsService,
  getContactByIdService,
  addContactService,
  updateContactService,
  removeContactService,
};