const contactsOperations = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      throw RequestError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
