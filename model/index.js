const { v4: uuidv4 } = require("uuid");
const db = require("./db");

// === GET all contacts ===
const listContacts = async () => {
  return db.get("contacts").value();
};

// === GET contact by ID ===
const getContactById = async (contactId) => {
  return db
    .get("contacts")
    .find(({ id }) => String(id) === String(contactId))
    .value();
};

// === REMOVE contact by ID ===
const removeContact = async (contactId) => {
  const [contact] = db
    .get("contacts")
    .remove(({ id }) => String(id) === String(contactId))
    .write();

  return contact;
};

// === ADD new contact ===
const addContact = async (body) => {
  const id = uuidv4();
  const contact = {
    id,
    ...body,
    ...(body.coordinates
      ? {}
      : { coordinates: "-13.162409912958838, -72.54494144232928" }),
  };

  db.get("contacts").push(contact).write();
  return contact;
};

// === UPDATE contact ===
const updateContact = async (contactId, body) => {
  const contact = db
    .get("contacts")
    .find(({ id }) => String(id) === String(contactId))
    .assign(body)
    .value();
  db.write();
  return contact.id ? contact : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
