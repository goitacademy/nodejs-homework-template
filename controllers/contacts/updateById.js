const contacts = require('../../models/contacts');
const CreateError = require('http-errors');
const { contactSchema } = require('../../schema');

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateContact(contactId, name, email, phone);
    if (!result) {
      throw new CreateError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
