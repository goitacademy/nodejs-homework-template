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
      const contact = lists.find(({ id }) => id === contactId);
      console.log(contact)
      if (!contact) {
          return null
      } else {
          return contact
      }
    } catch (err) {
        console.log(err.message)
    }
}

const removeContact = async (contactId) => {
  try {
        const buffer = await fs.readFile(contactsPath, "utf-8");
        const lists = JSON.parse(buffer);
        const updateContacts = lists.filter(list => list.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(updateContacts), "utf8");
        return updateContacts
    } catch (err) {
        console.log(err.message)
    }
}

const addContact = async ({id,name,email,phone}) => {
  try {
    const lists = await listContacts();
      const newContact = {
      id,  
      name,
      email,
      phone
    };
    lists.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(lists), "utf8");
    return newContact;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateContact = async (contactId, body) => {
  const { id,name, email, phone } = body;
  try {
      const lists = await listContacts()
      const contact = await getContactById(contactId)
      const newContact = {
          ...contact,
          id,
          name,
          email,
          phone
      }
      const updatedLists = lists.map(list => {
      if (list.id === contactId) {
        return newContact
      } else {
        return list
      }
    })
      await fs.writeFile(contactsPath, JSON.stringify(updatedLists), "utf8");
    return newContact
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
