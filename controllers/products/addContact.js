const contactsOperation = require('../../models/contacts');

const addContact = async (req, res, next) => {
  try {
    const newContact = await contactsOperation.addContact(req.body);
    console.log(newContact);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
