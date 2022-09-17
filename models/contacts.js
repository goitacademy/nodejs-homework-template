const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();

const contactsPath = path.resolve(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    return fs.readFile(contactsPath, 'utf8');
  } catch (error) {
    console.log(error);
  } 
}

const getContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(await listContacts());
    const [contact] = contacts.filter(contact => Number(contact.id) === Number(contactId));
    return contact;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  try {
    const prevContacts = JSON.parse(await listContacts());
    const { name, email, phone } = body;

    const newContact = { id, name, email, phone };
    const allContacts = [...prevContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(allContacts), 'utf8');
    console.log(newContact)
    return newContact;
  } catch (error) {
    console.log(error); 
  }
}

// addContact({name: "hhghfghghh", email: "jjhghghhghgjj", phone: "545454545" })

const updateContact = async (contactId, body) => { }


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
