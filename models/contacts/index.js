const fs = require("fs/promises");
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateContacts = async (allContacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

const listContacts = async () => {  
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
        const allContacts = await listContacts();
        const result = allContacts.find(contact => contact.id === contactId)
        return result || null;
};

const removeContact = async (contactId) => {
        const allContacts = await listContacts();
       const index = allContacts.findIndex(contact => contact.id === contactId);
       if (index === -1) {
           return null;
       };
       const [deletedContact] = allContacts.splice(index, 1);
       await updateContacts(allContacts);
       return deletedContact;
};

const addContact = async(data) => {
      const allContacts = await listContacts();
      const newContact = {
          id: nanoid(),
          ...data,
      };
      allContacts.push(newContact);
      await updateContacts(allContacts);
      return newContact;
};

const updateContact = async (contactId, body) => {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    allContacts[index] = { id: contactId, ...body };
    await updateContacts(allContacts);
    return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
