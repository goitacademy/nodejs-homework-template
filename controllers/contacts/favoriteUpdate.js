const { Contact } = require('../../models/contacts');

const favoriteUpdate = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true }).populate(
      'owner',
      'email'
    );

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (e) {
    next(e);
  }
};
