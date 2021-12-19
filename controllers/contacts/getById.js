const { Contact } = require('../../models');
const createError = require('http-errors');

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    status: 200,
    code: 200,
    data: { result: result },
  });
};

module.exports = getById;
