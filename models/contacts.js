const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, 'contacts.json');

const listContactsService = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactByIdService = async (contactId) => {
  const contacts = await listContactsService();
  const currentContact = contacts.find(contact => contact.id === contactId);
  return currentContact || null;
}

const removeContactService = async (contactId) => {
  const contacts = await listContactsService();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

const addContactService = async (body) => {
  const contacts = await listContactsService();
    const newContact = {
        id: nanoid(),
        name: body.name,
        email: body.email,
        phone: body.phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateContactService = async (contactId, body) => {
  const contacts = await listContactsService();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if(index === -1){
        return null;
    }
    contacts[index] = {...contacts[index], ...body};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
}
