const { Contact } = require('../../models/contact');

const getById = async (req, res, next) => {
  try {
    const contact = await Contact.findById({ _id: req.params.contactId });
    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    return res.json({ contact });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
