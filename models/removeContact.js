const {Contacts} = require('../db');


const removeContact = async (contactId) => {

  return await Contacts.findByIdAndDelete({_id: contactId});
};

module.exports = removeContact;
