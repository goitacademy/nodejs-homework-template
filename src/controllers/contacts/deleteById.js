const {removeContact} = require('../../models/index');
const createError = require('http-errors');

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw createError(404, `Product with ID=${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: { result },
  });
};


module.exports = deleteById;