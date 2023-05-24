const fs = require('fs/promises');
const path = require('path');
const fileURLToPath = require('url');
const { nanoid } = require("nanoid");
const HttpError = require('../helpers');

// const __filePath = fileURLToPath(import.meta.url);
// const contactsPath = path.join(__filePath, '..', 'contacts.json');
const contactsPath = path.resolve('models/contacts.json');
// console.log('contactsPath', contactsPath)

const listContacts = async () => {
  try{
    const contactsList = (await fs.readFile(contactsPath)).toString();
    return JSON.parse(contactsList);
  } catch (error) {
    console.log(error)
  }
}
const getContactById = async (contactId) => {
  try {
    const contactsArr = await listContacts();
    const findContact = contactsArr.find(elem => elem.id === contactId);

    return findContact;
  } catch (error) {
      console.log(error);
  }
}

const removeContact = async (contactId) => {
  try{
    const contactsArr = await listContacts();
    const getContactIndex = contactsArr.findIndex(elem => elem.id === contactId);
    let deletedContact;
    
    if(getContactIndex === -1){
      throw HttpError()
    }
    deletedContact = contactsArr.splice(getContactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
    
    return deletedContact;
  } catch (error) {
      console.log(error);
  }
}

const addContact = async ({name, email, phone}) => {
  let contactsArr = await listContacts();

  let newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone
  }

  contactsArr.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));

  return newContact;
}

const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts();
  const getContactIndex = contacts.findIndex(elem => elem.id === contactId);

  if(getContactIndex === -1) return null;

  contacts[getContactIndex] = {contactId, name, email, phone};

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

  return contacts[getContactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
