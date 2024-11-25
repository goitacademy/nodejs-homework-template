const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(`${contactsPath}`, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((item)=> item.id.toString() === contactId.toString());
  return contact || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((item)=> item.id.toString() === contactId.toString());
  if (!contact) {
    return null;
  }
  else {
    const newContactList = data.filter(contact => contact.id.toString() !== contactId.toString());
    await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
  };
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const data = await listContacts();
  const newContact = { 
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex(item => item.id === contactId);
  if(index === -1){
      return null;
  }
  data[index] = {contactId, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
