const contacts = require('../../models/contacts');
const CreateError = require('http-errors');

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw new CreateError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
