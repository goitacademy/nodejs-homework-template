const { contactsOperations } = require('../../models');
const { NotFound } = require('http-errors');

async function removeContactsById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found!`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = removeContactsById;
