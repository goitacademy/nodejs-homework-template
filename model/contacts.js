const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const db = require('./db');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  // fs.readFile(contactsPath, 'utf8', (err, data) => {
  //   if (err) {
  //     console.log('Error:', err);
  //     return;
  //   }
  //   // console.table(JSON.parse(data));
  //   return JSON.parse(data);
  //   // return data;
  // });
  return db.get('contacts').value();
};

const getContactById = async (contactId) => {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error:', err);
      return;
    }
    const contact = JSON.parse(data).filter(({ id }) => id === contactId);
    console.log(contact[0]);
    return contact[0];
  });
};

const removeContact = async (contactId) => {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log('RemoveContact error:', err);
      return;
    }

    const parsedData = JSON.parse(data);
    const newData = parsedData.filter(({ id }) => id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(newData), (err) =>
      console.log(err)
    );

    console.log(`Contact with id: ${contactId} was deleted`);
  });
};

const addContact = async (body) => {
  const newContact = {
    ...body,
    id: shortid.generate(),
  };

  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log('An error occur, contact wasn`t added. Error:', err);
      return;
    }
    const parsedData = JSON.parse(data);
    const newData = [...parsedData, newContact];

    fs.writeFile(contactsPath, JSON.stringify(newData), (err) =>
      console.log(err)
    );

    console.log('New contact has been added');
  });
};

const updateContact = async (contactId, body) => {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (!body) {
      const error = { message: 'missing fields' };
      return JSON.stringify(error);
    }

    if (err) {
      console.log('An error occur, contact wasn`t updated. Error:', err);
      return;
    }
    const parsedData = JSON.parse(data);
    let updatedContact = parsedData.find(({ id }) => id === contactId);
    updatedContact = {
      ...updatedContact,
      ...body,
    };
    const newData = {
      ...parsedData.filter(({ id }) => id !== contactId),
      updatedContact,
    };

    fs.writeFile(contactsPath, JSON.stringify(newData), (err) =>
      console.log(err)
    );

    console.log('New contact has been added');
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
