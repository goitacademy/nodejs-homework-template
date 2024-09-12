const { Contact } = require('../../models/contact');

const findContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = findContactById;
