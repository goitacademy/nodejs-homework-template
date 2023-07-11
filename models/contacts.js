const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();

    return contactsList.find(item => item.id === contactId || null);
  } catch(error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  index = contacts.findIndex(item => item.id === contactId);
  contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const addContact = async (body) => {
  try {
    const currentContacts = await listContacts();
    const newContact = {
      id: body.id,
      name: body.name,
      email: body.email,
      phone: body.phone
    }
    const newContactsList = [...currentContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));

    return newContact;

  } catch(error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const currentContacts = await listContacts();
    const updatedContacts = currentContacts.map(item => {
      console.log('contactId',contactId)
      if (item.id === contactId) {
        item.name = name;
        item.email = email;
        item.phone = phone;
        console.log('item1', item)
        return item;
      } else {
        console.log('item2', item.id)
        return item;
      }
    })
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    
  } catch(error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
