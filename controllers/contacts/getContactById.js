const Contact = require('../../models/contact');
const createError = require('http-errors');

async function getContactById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw new createError(404, 'Not found');
      // const error = new Error('Not found');
      // error.status = 404;
      // throw error;

      // res.status(404).json({ message: 'Not found' });
    }
    res.json(result);
  } catch (error) {
    if (error.message.includes('Cast to Object failed')) {
      error.status = 404;
    }
    next(error);

    // res.status(500).json({ message: 'Server error' });
  }
}

module.exports = getContactById;
