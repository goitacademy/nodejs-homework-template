const db = require("./db");
const { v4: uuid } = require("uuid");

const listContacts = async () => {
  return db.get("contacts").value();
};

const getContactById = async (id) => {
  return db.get("contacts").find({ id }).value();
};

const removeContact = async (id) => {
  const [delContact] = db.get("contacts").remove({ id }).write();
  return delContact;
};

const addContact = async (body) => {
  const id = uuid();
  const newContact = {
    id,
    ...body,
  };
  db.get("contacts").push(newContact).write();
  return newContact;
};

const updateContact = async (id, body) => {
  const updContact = db.get("contacts").find({ id }).assign(body).value();

  db.write();

  return updContact.id ? updContact : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
