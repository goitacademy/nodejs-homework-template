const { Contact } = require('../models/contact.js');
const { NotFound } = require('http-errors');

const userVerification = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact || contact.owner.toString() !== _id.toString()) {
      throw new NotFound('Contact not found');
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports =  userVerification ;