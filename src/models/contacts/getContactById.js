const getContactsList = require('../lib/getContactsList');


const getContactById = async (contactId) => {
  try {
    const contacts = await getContactsList();
    const currentContact = contacts.find((item)=>String(item.id) === contactId)
  if (!currentContact){
    return null;
  }return currentContact;
  
  } catch (err) {
    return console.log(err.message);
  }
};

module.exports = getContactById();