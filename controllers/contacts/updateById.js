const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { isValidId } = require('../../middlewares');


const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  isValidId(req, res, next);
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedContact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    cose: 200,
    data: {
      updatedContact,
    },
  });
};

module.exports = updateById;
