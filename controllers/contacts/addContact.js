const operations = require('../../models/contactsOperations');

const addContact = async (req, res, next) => {
  try {
    const contact = await operations.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
