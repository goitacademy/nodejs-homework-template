const operationsContacts = require('../../models/contacts');
const createError = require('http-errors');

const removeById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await operationsContacts.removeContact(contactId);

    if (!result) {
      throw new createError.NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: 'success',
      code: 200,
      data: result,
      message: 'Contact removed',
    });
};

module.exports = removeById;
