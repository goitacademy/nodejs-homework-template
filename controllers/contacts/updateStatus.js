const { contact: service } = require('../../service');

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;

  const { favorite = false } = req.body;

  try {
    const result = await service.updateStatusContact(contactId, { favorite });

    if (Object.keys(req.body).length === 0) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'missing field favorite',
        data: 'Not Found',
      });
    }
    await res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateStatusContact;
