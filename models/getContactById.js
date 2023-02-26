const {Contacts} = require('../db');

const getContactById = async (contactId) => {
return await Contacts.find({_id: contactId});
};

module.exports = getContactById;