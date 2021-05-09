// const fs = require('fs/promises')
const db = require('./db');
const { v4: uuid } = require('uuid');

const getAll = async () => {
  return db.get('contacts').value();
};

const getContactById = async (contactId) => {
  return db.get('contacts').find({ contactId }).value();
};

const removeContact = async (contactId) => {
  const [record] = db.get('contacts').remove({ contactId }).write();
  return record;
};

const addContact = async (body) => {
  const contactId = uuid();
  const record = {
    contactId,
    ...body,
  };
  db.get('contacts').push(record).write();
  return record;
};

const updateContact = async (contactId, body) => {
  const record = db.get('contacts').find({ contactId }).assign(body).value();
  db.write();
  return record.contactId ? record : null;
};

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
