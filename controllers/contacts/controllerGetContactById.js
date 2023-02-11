const { getContactById } = require('../../services/contacts');

const controllerGetContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contactById = await getContactById(contactId);
    if (contactById === undefined) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({
      status: 'success',
      code: 200,
      data: { contactById },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

module.exports = { controllerGetContactById };
