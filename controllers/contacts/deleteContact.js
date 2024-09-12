const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      message: 'Your contact deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
