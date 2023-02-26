const { NotFound } = require('http-errors');
const contactsOperations = require('../../models/contacts');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);

  if (!result) {
    throw new NotFound();
  };

  res.status(200).json({
    status: 'success',
    code: 200,
    message: "contact deleted",
    result,
  });
};

module.exports = removeById;