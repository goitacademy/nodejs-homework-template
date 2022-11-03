const fs = require('fs/promises')
const path = require("path");
const shortid = require('shortid');
const contactsPath = path.join(__dirname , './contacts.json');




const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId , res) => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  return contact || null;
}

const addContact = async (body) => {
  const id = shortid.generate();
  const newContact = {
    id, ...body
  };

  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;

};

const updateContactsList = async (contacts) => {
  const updateContacts = await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts)
  );
  return updateContacts;
};


const updateContact = async (contactId, body) => {
   const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, ...body };
  await updateContactsList(contacts);
  return contacts[idx];
}




const removeContact = async (contactId) => {

  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContactsList(contacts);
  return result;
};




module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
