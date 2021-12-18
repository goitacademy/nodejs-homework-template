/* eslint-disable semi */
/* eslint-disable quotes */
const listContacts = require("./listContacts");

const getContactById = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === Number(id));
  if (idx === -1) {
    return null;
  }
  return contacts[idx];
};
module.exports = getContactById;
