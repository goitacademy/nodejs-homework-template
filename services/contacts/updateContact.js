const contactsOperations = require('../../models/contacts')

const updateContact = async() => {
  try {
    const data = await contactsOperations.updateContact()
    return data
    
  } catch (err) {
    console.log(err.message);
  }
 
};

module.exports = updateContact;