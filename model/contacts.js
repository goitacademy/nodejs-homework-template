const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error:', err);
      return;
    }
    return data;
  });
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(({ id }) => id.toString() === contactId);
    return contactById;
  } catch (error) {
    console.log('Error:', error);
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  let deletedContact = {};

  const newContacts = contacts.filter((contact) => {
    if (contact.id.toString() === contactId) {
      deletedContact = {
        ...contact,
      };
      return false;
    } else {
      return true;
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) =>
    console.log(err)
  );

  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContactBody = {
    ...body,
    id: shortid.generate(),
  };

  const newData = [...contacts, newContactBody];

  await fs.writeFile(contactsPath, JSON.stringify(newData), (err) =>
    console.log(err)
  );

  return newContactBody;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  let newContact = {};

  const newContacts = contacts.map((contact) => {
    if (contact.id.toString() === contactId) {
      newContact = {
        ...contact,
        ...body,
      };

      return newContact;
    } else {
      return contact;
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) =>
    console.log(err)
  );

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
