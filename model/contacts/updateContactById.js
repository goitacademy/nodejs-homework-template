/* eslint-disable semi */
/* eslint-disable quotes */
const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === Number(id));
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...data };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = updateContactById;
