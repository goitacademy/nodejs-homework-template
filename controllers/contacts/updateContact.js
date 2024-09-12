const { Contact } = require('../../models/contact');

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
      throw res.status(404).json({ message: 'Not found' });
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
