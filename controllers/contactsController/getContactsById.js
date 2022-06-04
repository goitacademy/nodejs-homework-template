const { contactsOperations } = require('../../models');
const { NotFound } = require('http-errors');

async function getContactsById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found!`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getContactsById;
