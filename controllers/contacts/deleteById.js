const { Contact } = require('../../models');

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
