const contactsOperations = require('../../models/contacts')

const updateContact = async(contactId, body) => {
  try {
    const data = await contactsOperations.updateContact(contactId, body)
    return data
    
  } catch (err) {
    console.log(err.message);
  }
 
};

module.exports = updateContact;