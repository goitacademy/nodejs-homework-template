const { contact: Contact } = require('../service');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.update(contactId, { ...req.body });
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing fields',
      });
    }

    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
    await res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateContact;
