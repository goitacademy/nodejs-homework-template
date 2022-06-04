const listContacts = require('./listContacts');
const contactPathUpdate = require('./contactsPathUpdate');

async function removeContact(id) {
  const dataContactsGetAll = await listContacts();
  const idx = dataContactsGetAll.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const newDataContactsGetAll = dataContactsGetAll.filter(
    (_, index) => index !== idx
  );
  await contactPathUpdate(newDataContactsGetAll);
  return dataContactsGetAll[idx];
}

module.exports = removeContact;
