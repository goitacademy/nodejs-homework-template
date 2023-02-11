const { addContact } = require('../../services/contacts');

const controllerPostContact = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

module.exports = { controllerPostContact };
