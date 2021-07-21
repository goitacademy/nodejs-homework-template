const { contact: Contact } = require('../service');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.remove(contactId);
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
      message: 'contact deleted',
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = removeContact;
