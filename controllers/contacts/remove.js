const contactsOperations = require('../../models/contacts');

const { RequestError } = require('../../helpers');

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsOperations.removeContact(contactId);

    if (!result) {
      throw RequestError(404, 'Not found');
    }

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
