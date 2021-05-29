const db = require('./db');
const {v4:uuid}= require("uuid")

const listContacts = async () => {
  return db.get('contacts').value();
}

const getById = async (id) => {
  return db.get('contacts').find({ id }).value();
}

const removeContact = async (id) => {
  const [record] = db.get('contacts').remove({ id }).write();
  return record;
}

const create = async (body) => {
  const id = uuid();
  const record = {
    id,
    ...body
  };
  db.get("contacts").push(record).write();
  return record;
}

const update = async (id, body) => {
  const record = db.get('contacts').find({ id }).assign(body).value();
  db.write();
  return record.id ? record : null;
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  create,
  update,
}
