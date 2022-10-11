const contactsOperations = require('../../models/contacts');

const { RequestError, addSchema } = require('../../helpers');

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const newContact = { ...req.body };

    const result = await contactsOperations.addContact(newContact);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
