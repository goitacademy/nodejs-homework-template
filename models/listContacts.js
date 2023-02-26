const {Contacts} = require('../db');


const listContacts = async () => {
  return await Contacts.find({});
};

module.exports = listContacts;