const {BadRequest, NotFound} = require('http-errors');
const {Contact} = require('../model/contactSchema');
const {isEmailInContacts, isPhoneInContacts} = require('../helpers');

const checkFieldInContact = async (req, res, next) => {
  const contacts = await Contact.find();
  const {email, phone} = req.body;
  const {contactId} = req.params;

  if (
    (await isEmailInContacts(contacts, email, contactId)) ||
    (await isPhoneInContacts(contacts, phone, contactId))
  ) {
    next(new BadRequest('Contact with same email or phone already exists.'));
  }

  next();
};

const checkIdInContact = async (req, res, next) => {
  const {contactId} = req.params;

  const contacts = await Contact.find();
  const searchedIndex = await contacts.findIndex(
      ({id}) => id.toString() === contactId.toString(),
  );

  if (searchedIndex === -1) {
    next(new NotFound('Not found'));
  }

  next();
};

module.exports = {
  checkFieldInContact,
  checkIdInContact,
};
