const { Contact } = require('../../models/contacts');

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true }).populate(
      'owner',
      'email'
    );

    if (!result) {
      const error = new Error(`Contact with ${contactId} not found. Try to send correct id`);
      error.status = 404;
      throw error;
    }

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
