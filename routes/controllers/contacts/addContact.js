const contactsOps = require('../../../model');
const { schemaAddContact } = require('../../api/validation');

const addContact = async (req, res, next) => {
  try {
    const { error } = schemaAddContact.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    const contact = await contactsOps.addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
