const { Contact } = require('../../models/contacts');
const { createError } = require('../../errors');

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json({ status: 'success', code: 200, message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
