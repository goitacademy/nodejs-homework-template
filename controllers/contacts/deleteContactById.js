const contactsOperations = require('../../models/contacts');
const createError = require('http-errors');

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsOperations.removeContact(contactId);

    if (result === undefined) {
      throw createError(404, 'Not found');
    }
    res.status(200).json({
      status: 'succes',
      code: 200,
      message: 'contact deleted',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteContactById;
