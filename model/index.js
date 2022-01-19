const fs = require('fs/promises')
const path = require('path');
const crypto = require ('crypto')
const contactPath = path.join(__dirname, 'contacts.json');



const readContent = async () => {
  const content = await fs.readFile(contactPath, 'utf8');
  return JSON.parse(content);
}

const writeContent = async (content) => {
  await fs.writeFile(contactPath, JSON.stringify(content, null, 2))
}


const listContacts = async () => await readContent();  


const getContactById = async (contactId) => {
  
  const contacts = await readContent()
  return contacts.find(it => it.id === contactId)
}

const removeContact = async (contactId) => {
  const contacts = await readContent();
  const newContacts = contacts.filter(it => it.id !== contactId);
  await writeContent(newContacts);
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContent();
  const newContact = { id: crypto.randomUUID(), name, email, phone  };
  contacts.push(newContact);
  await writeContent(contacts);
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await readContent();
  const index = contacts.findIndex(it => it.id === contactId);
  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body }
    contacts[index] = updatedContact;
    await writeContent(contacts);
    return updatedContact;
  }
  return null
  
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}