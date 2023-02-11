const { updateStatusContact } = require('../../services/contacts');

const controllerPatchFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const contact = await updateStatusContact(contactId, { favorite });
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { controllerPatchFavorite };
