const getAll = require('./getAll');
const updateContacts = require('./updateContacts.js');

const removeById = async (id) => {
  const contacts = await getAll();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  // Вариант со splice
  // const [removeContact] = contacts.splice(idx, 1);
  // await updateContacts(contacts);
  // return removeContact;
  const newContact = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContact);
  return contacts[idx];
}

module.exports = removeById;