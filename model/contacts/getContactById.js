const getListContacts = require('./getListContacts');

const getContactById = async id => {
  const contactsList = await getListContacts();
  const desiredСontact = contactsList.find(
    contact => String(contact.id) === id,
  );
  if (!desiredСontact) {
    return null;
  }
  return desiredСontact;
};

module.exports = getContactById;
