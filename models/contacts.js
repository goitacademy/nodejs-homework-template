const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join('models', 'contacts.json');

const listContacts = async () => {
  try { 
        const buffer = await fs.readFile(contactsPath, "utf-8");
        const lists = JSON.parse(buffer);
        return lists
    } catch (err) {
        console.log(err.message)
    }
}

const getContactById = async (contactId) => {
  try{
        const lists = await listContacts()
        const contacta = lists.find(({ id }) => id === contactId);
      if (!contacta) {
          return null
      } else {
          return contacta
      }
    } catch (err) {
        console.log(err.message)
    }
}

const removeContact = async (contactId) => {
  try {
        const buffer = await fs.readFile(contactsPath, "utf-8");
        const lists = JSON.parse(buffer);
        const updateContact = lists.filter(list => list.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(updateContact), "utf8");
        await listContacts()
    } catch (err) {
        console.log(err.message)
    }
}

const addContact = async (body) => {
  const { id,name, email, phone } = body;
  try {
        const lists = await listContacts()
        const newContact = [
            {
            id,
            name,
            email,
            phone
            }
      ];
        lists.push(newContact)
        await fs.writeFile(contactsPath, JSON.stringify(lists), "utf8");
        return newContact
    } catch (err) {
        console.log(err)
    }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  try {
      const lists = await listContacts()
      const contact = lists.filter(list => list.id === contactId)
      const updatedContact = {
      ...contact,
      id: contactId,
      name,
      email,
      phone,
    };
    lists.push(updatedContact);
    return updatedContact
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
