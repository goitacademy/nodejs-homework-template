const { Contact } = require('../../models/contacts');

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  return res.json({
    status: "success",
    code: 200,
    result: contacts,
  })
}

module.exports = listContacts;

