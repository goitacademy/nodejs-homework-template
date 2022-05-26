const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.resolve(__dirname, './contacts.json');

const listContacts = async () => {
  console.log('listContacts');
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('error', error);
  }
};

const getContactById = async contactId => {
  console.log('getContactById');
  try {
    const data = await listContacts();
    return data.find(item => item.id === contactId);
  } catch (error) {
    console.log('error', error);
  }
};

const removeContact = async contactId => {
  console.log('removeContact');
  try {
    const data = await listContacts();

    const afterRemoveData = data.filter(item => item.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(afterRemoveData), 'utf8', err => {
      if (err) throw err;
    });

    listContacts();
  } catch (error) {
    console.log('error', error);
  }
};

const addContact = async (name, email, phone) => {
  console.log('addContact');
  try {
    const data = await listContacts();
    const newContent = data;
    const newItem = {
      id: `${
        Math.max.apply(
          null,
          data.map(item => item.id)
        ) + 1
      }`,
      name,
      email,
      phone,
    };
    newContent.push(newItem);

    await fs.writeFile(contactsPath, JSON.stringify(newContent), 'utf8', err => {
      if (err) throw err;
    });
    return newItem;
  } catch (error) {
    console.log('error', error);
  }
};

const updateContact = async (contactId, body) => {
  console.log('updateContact');

  try {
    const data = await listContacts();

    const newItem = {
      id: contactId,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    const newContent = data;
    newContent.forEach(contact => {
      if (contact.id === contactId) {
        contact.name = newItem.name;
        contact.email = newItem.email;
        contact.phone = newItem.phone;
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(newContent), 'utf8', err => {
      if (err) throw err;
    });
    return newItem;
  } catch (error) {
    console.log('error', error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
