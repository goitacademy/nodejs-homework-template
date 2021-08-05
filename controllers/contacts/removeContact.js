const { contact: service } = require('../../services');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  try {
    const result = await service.removeContact(userId, contactId);
    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Such id: ${contactId} was not found`,
      });
    }
    await res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Contact removed',
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
