const { listContacts } = require("./listContacts");

async function getContactById(contactId) {
  const listContact = await listContacts();
  const result = listContact.find((item) => item.id === contactId);
  return result;
}
module.exports = {
  getContactById,
};
