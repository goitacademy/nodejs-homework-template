const Contact = require('../../models/contacts')
const requestError = require('../../helpers/requestError')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    throw requestError(404);
  }
  res.json({"message": "contact deleted"})
}
module.exports = removeContact