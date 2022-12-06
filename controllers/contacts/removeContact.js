const contacts = require('../../models/contacts.js');
const {HttpErr} = require('../../helpers')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
     
  if (!result) {
    throw HttpErr(404, "Not found");
  }

  res.status(200).json({ message: "Contact deleted" })
}

module.exports = removeContact;