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
    return res
        .status(400)
        .json({message: 'Contact with same email or phone already exists.'});
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
    return res.status(404).json({message: 'Not found'});
  }

  next();
};

module.exports = {
  checkFieldInContact,
  checkIdInContact,
};
