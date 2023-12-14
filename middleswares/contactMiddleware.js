const { Types } = require("mongoose");

const { Contact } = require("../models/contact");

const { catchAsync, HttpError, contactValidators } = require("../helpers");

const checkContactId = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const idIsValid = Types.ObjectId.isValid(contactId);

  if (!idIsValid) throw new HttpError(404, "Contact not found..");

  // const contactExists = await Contact.exists({ _contactId: contactId }); // чи існує контакт
  const contactExists = await Contact.findById(contactId).exec();   // чи існує контакт

  if (!contactExists) throw new HttpError(404, " message: Not found ");

  next();
});

const checkCreateContactData = catchAsync(async (req, res, next) => {
  
  const { value, error } = contactValidators.createContactDataValidator(req.body);

  if (error) throw new HttpError(400, "Invalid contact data!");
 
  const contactExists = await Contact.exists({ email: value.email });

  if (contactExists)
    throw new HttpError(409, "Contact with this email already exists..");

  req.body = value;

  next();
});

module.exports = {
  checkContactId,
  checkCreateContactData,
};
