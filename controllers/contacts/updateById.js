const { Contact } = require('../../models/contact');

const updateById = async (req, res, next) => {
  try {
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true },
    );
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.json({
      updateContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
