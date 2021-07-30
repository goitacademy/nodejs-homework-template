const { Contact } = require('../../models/contacts');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndRemove({ _id: contactId });

    res.status(204).json({
      status: 'success',
      code: 204,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
