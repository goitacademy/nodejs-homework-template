const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, "contacts.json");
const { v4: uuidv4 } = require("uuid");


const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts);
};

listContacts();

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const findContact = allContacts.find((contact) => contact.id === contactId);
  // console.log(findContact);
  return findContact || null;
};

// getContactById('qdggE76Jtbfd9eWJHrssH');


const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const deleteContact = allContacts.filter((contact) => contact.id !== contactId);
  const contacList = await fs.writeFile(contactsPath, JSON.stringify(deleteContact), (err) =>{
    if(err) console.err(err);
  }).then(()=> `Contact was successfully deleted`);
  return contacList;
}

// removeContact('qdggE76Jtbfd9eWJHrssH');

const addContact = async (data) => {
  const {name, email, phone} = data;
  const allContacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone}
  allContacts.push(newContact);
  const contactList = await fs.writeFile(contactsPath, JSON.stringify(allContacts), (err) =>{
    if(err) console.err(err);
  }).then(() => `Contact was added successfully.`);
  return contactList;
}

// addContact('prueba', 'ramiro@gmail.com', '78956');


const updateContact = async (contactId, { name, phone, email }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
  const [contact] = contacts.filter((el) => el.id === contactId)

  if (!contact) {
    return null
  }
  if (name) {
    contact.name = name
  }
  if (phone) {
    contact.phone = phone
  }
  if (email) {
    contact.email = email
  }

  const [result] = contacts.splice(index, 1, contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}


// updateContact('AeHIrLTr6JkxGE6SN-0Rw',{name: 'pedro', email: 'pedro@g.com'});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
