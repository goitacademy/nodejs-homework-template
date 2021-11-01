const contactsData = require("./contactsData");

const listContacts = async () => {
  return await contactsData();
};

module.exports = listContacts;
