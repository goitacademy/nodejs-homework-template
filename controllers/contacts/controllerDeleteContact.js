const { removeContact } = require('../../services/contacts');

const controllerDeleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await removeContact(contactId);
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: { contact },
      });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

module.exports = { controllerDeleteContact };
