const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { isValidId } = require('../../middlewares');

const getById = async (req, res, next) => {
  const contactId = req.params.contactId;

  isValidId(req, res, next);

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: { contact },
  });
};

module.exports = getById;
