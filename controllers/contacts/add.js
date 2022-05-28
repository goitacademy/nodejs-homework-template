const contactsOperations = require('../../models/contacts');

const add = async (req, res, next) => {
  try {
    const { body } = req;

    const result = await contactsOperations.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
