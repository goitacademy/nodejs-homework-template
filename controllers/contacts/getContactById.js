const {listContacts} = require('./listContacts');

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contact = data.find(item => String(item.id) === String(contactId));

    return contact;
    
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getContactById
}