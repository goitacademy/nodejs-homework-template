const { v4: uuidv4 } = require("uuid");
const db = require("../db/index");

const listContactsRepository = () => {
  return db.get("contacts").value();
};

const getContactByIdRepository = (id) => {
  return db.get("contacts").find({ id }).value();
};

const addContactRepository = (body) => {
  const id = uuidv4();
  const record = {
    id,
    ...body,
  };
  db.get("contacts").push(record).write();
  return record;
};

const removeContactRepository = (id) => {
  const [record] = db.get("contacts").remove({ id }).write();
  return record;
};

const updateContactRepository = (id, body) => {
  db.get("contacts").find({ id }).assign(body).write();
  const record = db.get("contacts").find({ id }).value();
  return record;
};

module.exports = {
  listContactsRepository,
  getContactByIdRepository,
  removeContactRepository,
  addContactRepository,
  updateContactRepository,
};
