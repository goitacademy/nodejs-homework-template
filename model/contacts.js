const db = require('./db');
const { nanoid } = require('nanoid');

const listContacts = async () => {
  return db.get('contacts').value();
};

const getContactById = async contactId => {
  return db
    .get('contacts')
    .find(({ id }) => id == contactId)
    .value();
};

const addContact = async body => {
  const id = nanoid();
  const record = {
    id,
    ...body,
  };
  db.get('contacts').push(record).write();
  return record;
};

const updateContact = async (contactId, body) => {
  const record = db
    .get('contacts')
    .find(({ id }) => id == contactId)
    .assign(body)
    .value();
  db.write();
  return record;
};

const removeContact = async contactId => {
  const [record] = db
    .get('contacts')
    .remove(({ id }) => id == contactId)
    .write();
  return record;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
