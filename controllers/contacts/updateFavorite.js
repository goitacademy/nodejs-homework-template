const { Contact } = require('../../models/contacts');
const { createError } = require('../../errors');

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
