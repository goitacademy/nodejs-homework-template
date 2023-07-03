const { Contact } = require('../schema');
const { errorHandler } = require('../helpers');

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw errorHandler(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { deleteContact };