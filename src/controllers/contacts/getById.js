const { Contact } = require("../../models/contacts");
const createError = require('http-errors');

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const contact = await Contact.findOne({_id: contactId});
  const result = await Contact.findById(contactId);

  if (!result) {
    throw createError(404, `Product with ID=${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result: result },
  });
};

module.exports = getById;