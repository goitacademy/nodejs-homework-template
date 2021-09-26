const {listContacts} = require('./index');

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contact = data.find(item => item.id === Number(contactId));

    return JSON.parse(contact);
    
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getContactById
}