const { listContacts } = require('../../services/contacts');

const controllerGetContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

module.exports = { controllerGetContacts };
