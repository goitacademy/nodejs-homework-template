const { Contact } = require('../../models');
const createError = require('http-errors');

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    return res.status(200).json({
      message: 'Deleted contact',
    });
  } catch (error) {
    return next(createError(404, 'Contact not found'));
  }
};
module.exports = removeContact;
