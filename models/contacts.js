const { randomUUID } = require("crypto");
const DB = require("../db/adapterDB");

const db = new DB("../db/contacts.json");

const getContactsModel = async () => {
  return await db.read();
};

const getContactByIdModel = async (contactId) => {
  const contacts = await getContactsModel();
  return contacts.find((el) => el.id === contactId);
};

const addContactModel = async (body) => {
  const contacts = await getContactsModel();
  const newContact = { id: randomUUID(), ...body };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

const updateContactPutModel = async (contactId, body) => {
  const contacts = await getContactsModel();
  const contactIndex = contacts.findIndex((el) => el.id === contactId);
  if (contactIndex === -1) return null;
  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...body,
  };
  await db.write(contacts);
  return contacts[contactIndex];
};

const updateContactPatchModel = async (contactId, body) => {
  const contacts = await getContactsModel();
  const contactIndex = contacts.findIndex((el) => el.id === contactId);
  if (contactIndex === -1) return null;
  for (const keyPrev in contacts[contactIndex]) {
    for (const key in body) {
      if (
        keyPrev === key &&
        contacts[contactIndex][keyPrev] !== body[key] &&
        body[key]
      ) {
        contacts[contactIndex][keyPrev] = body[key];
      }
    }
  }
  await db.write(contacts);
  return contacts[contactIndex];
};

const deleteContactModel = async (contactId) => {
  const contacts = await getContactsModel();
  const contactIndex = contacts.findIndex((el) => el.id === contactId);
  if (contactIndex !== -1) {
    const deleteContact = contacts.splice(contactIndex, 1);
    await db.write(contacts);
    return deleteContact;
  }
  return null;
};

module.exports = {
  getContactsModel,
  getContactByIdModel,
  addContactModel,
  updateContactPutModel,
  updateContactPatchModel,
  deleteContactModel,
};
