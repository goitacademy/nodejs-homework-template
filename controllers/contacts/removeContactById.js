const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const removeContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contacts.removeById(contactId)
  if (!result) {
    throw RequestError(404, 'Not found')
  }
  res.json({
    message: 'Delete success',
  })
};

module.exports = removeContactById