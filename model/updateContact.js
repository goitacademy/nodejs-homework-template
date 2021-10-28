const {writeData, editContact} = require('./helpers');
const listContacts = require('./listContacts');

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const searchedIndex = await contacts.findIndex(
      ({id}) => id.toString() === contactId.toString(),
  );

  contacts[searchedIndex] = editContact(contacts[searchedIndex], {
    ...body,
  });

  await writeData(contacts);

  return contacts[searchedIndex];
};

module.exports = updateContact;
