const Contact = require('../../models/contact');
const createError = require('http-errors');

async function correctContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
      throw new createError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = correctContact;
