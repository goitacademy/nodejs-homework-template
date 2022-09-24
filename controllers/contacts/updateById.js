const { Contact, schema } = require('../../models/contacts');
const createError = require('../../errors');

const updateById = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, 'missing fields');
    }
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

module.exports = updateById;
