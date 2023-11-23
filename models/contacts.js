const fs = require('fs/promises');
const path = require('node:path'); 

const contactsPath = path.join(__dirname,'contacts.json');

const listContacts = async () => {
      const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const data = await listContacts();
  const currentContact = data.find(({ id }) => id === contactId);
  return currentContact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();

    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
        return null;
    }

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    
    return result;
}

const addContact = async (body) => {
    const contacts = await listContacts();
    
    const { name, email, phone } = body;
    const newContact = {
          id: String(Date.now()),
          name,
          email,
          phone,
        };
  
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact||null;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const id = contactId;
  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
