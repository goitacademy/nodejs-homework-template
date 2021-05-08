const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, err => {
    if (err) {
      throw err;
    }
  });
  const content = JSON.parse(data);
  return content;
};

const getContactById = async contactId => {
  const data = await fs.readFile(contactsPath, err => {
    if (err) {
      throw err;
    }
  });
  const content = JSON.parse(data);
  const filteredContact = content.find(
    contact => String(contact.id) === contactId,
  );
  return filteredContact;
};

const addContact = async body => {
  const data = await fs.readFile(contactsPath, err => {
    if (err) {
      throw err;
    }
  });
  const content = JSON.parse(data);
  const id = uuid();
  const record = {
    id,
    ...body,
  };
  content.push(record);
  await fs.writeFile(contactsPath, JSON.stringify(content, null), err => {
    if (err) {
      throw err;
    }
  });
  return record;
};

const removeContact = async contactId => {
  const data = await fs.readFile(contactsPath, err => {
    if (err) {
      throw err;
    }
  });
  const content = JSON.parse(data);
  const filteredContacts = content.filter(
    contact => String(contact.id) !== contactId,
  );
  const deletedContact = content.find(
    contact => String(contact.id) === contactId,
  );
  await fs.writeFile(
    contactsPath,
    JSON.stringify(filteredContacts, null),
    err => {
      if (err) {
        throw err;
      }
    },
  );
  return deletedContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, err => {
    if (err) {
      throw err;
    }
  });
  const content = JSON.parse(data);
  const contact = content.find(contact => String(contact.id) === contactId);
  const updatedContact = { ...contact, ...body };
  const updatedContacts = content.map(contact => {
    if (String(contact.id) === contactId) {
      return { ...contact, ...body };
    }
    return contact;
  });

  if (updatedContact.id) {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null),
      err => {
        if (err) {
          throw err;
        }
      },
    );
  }
  return updatedContact.id ? updatedContact : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
