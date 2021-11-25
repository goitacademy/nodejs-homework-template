const getAll = require('./getAll')

const getContactById= async (contactId) => {
    const contacts = await getAll();
    const result = contacts.find(contact => contact.id === Number(contactId))
    return result;
  }


module.exports = getContactById


