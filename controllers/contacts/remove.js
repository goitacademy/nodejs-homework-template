const { NotFound } = require('http-errors');
const { removeContact } = require('../../models/contacts');

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) throw new NotFound('Contact not found');

    res.json({
      success: true,
      code: 200,
      message: 'contact deleted',
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
