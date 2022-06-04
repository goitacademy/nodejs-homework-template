const contactPathUpdate = require('./contactsPathUpdate');
const listContacts = require('./listContacts');

async function updateContact(id, data) {
  const dataContactsGetAll = await listContacts();
  const idx = dataContactsGetAll.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  dataContactsGetAll[idx] = { id, ...data };
  await contactPathUpdate(dataContactsGetAll);
  return dataContactsGetAll[idx];
}
module.exports = updateContact;
