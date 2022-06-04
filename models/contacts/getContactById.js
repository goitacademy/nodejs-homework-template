const listContacts = require('./listContacts');

async function getContactById(contactId) {
  const dataContactsGetAll = await listContacts();
  const dataGetContactById = dataContactsGetAll.find(
    (item) => item.id === contactId
  );
  if (!dataGetContactById) {
    return null;
  }
  return dataGetContactById;
}

module.exports = getContactById;
