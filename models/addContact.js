const {Contacts} = require('../db')


const addContact = async (body) => {

  return await Contacts.create(body);

};

module.exports = addContact;