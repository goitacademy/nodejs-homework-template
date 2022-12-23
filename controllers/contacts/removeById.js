const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { isValidId } = require('../../middlewares');

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  isValidId(req, res, next);

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
