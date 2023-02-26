const {Contacts} = require('../db');


const updateContact = async (contactId, body) => {

  return await Contacts.findByIdAndUpdate({_id: contactId}, body, {new: true});

};


module.exports = updateContact;
