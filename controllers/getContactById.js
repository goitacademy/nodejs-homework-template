const contacts = require('../models/contacts');
const { errorHandler } = require('../helpers');

async function getContactById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById({ id: contactId });
    if (!result) {
      throw errorHandler(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getContactById };
