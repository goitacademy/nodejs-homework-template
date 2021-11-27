const listContacts = require('./listContacts');
const updateContacts = require('./updateContacts');

const removeContactById = async id => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await updateContacts(newContacts);
    return contacts[idx];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = removeContactById;
