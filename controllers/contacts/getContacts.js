const { Contact } = require('../../models');

const getContacts = async (req, res, next) => {
  const { _id } = req.user;
  const contacts = await Contact.find({owner: _id});
  res.json({status: "success ", code: 200, payload : {contacts}})
}

module.exports = getContacts;
