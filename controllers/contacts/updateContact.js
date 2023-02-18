const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await operations.getById(contactId);

    if (!contact) {
      const error = new Error(`Contact with ${contactId} not found. Try to send correct id`);
      error.status = 404;
      throw error;
    }

    const result = await operations.updById(contactId, contact, req.body);

    if (!result) {
      const err = new Error();
      err.status = 404;
      err.message = `Contact with ID=${contactId} not found`;
      throw err;
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
