const { NotFound } = require('http-errors');
// const contactsOperations = require('../../model/contacts');
const { Contact } = require('../../models');

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const deletedId = await Contact.findByIdAndRemove(contactId);
  if (!deletedId) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  });
};

module.exports = removeById;
