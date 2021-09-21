const { Contact } = require('../../models/contact');

const delById = async (req, res, next) => {
  try {
    const deleteContact = await Contact.findByIdAndDelete(req.params.contactId);
    if (!deleteContact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    return res.json({ deleteContact });
  } catch (error) {
    next(error);
  }
};

module.exports = delById;
