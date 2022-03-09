const { Contact } = require('../../models');

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.json({status: "success ", code: 200, payload : {contacts}})
}

module.exports = getContacts;
