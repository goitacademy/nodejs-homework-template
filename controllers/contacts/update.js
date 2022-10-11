const contactsOperations = require('../../models/contacts');

const { RequestError, addSchema } = require('../../helpers');

const update = async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body,
    } = req;

    if (Object.keys(body).length === 0) {
      throw RequestError(400, 'missing fields');
    }

    const { error } = addSchema.validate(body);

    if (error) {
      throw RequestError(400, error.message);
    }

    const result = await contactsOperations.updateContact(contactId, body);

    if (!result) {
      throw RequestError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
