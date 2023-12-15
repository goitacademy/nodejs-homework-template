const { Types } = require("mongoose");

const { Contact } = require("../models/contact");

const { catchAsync, HttpError, contactValidators } = require("../helpers");

const { contactServices } = require("../services");

// визиває ф-цію, яка перевіряє чи є контакт з таким id
const checkContactId = catchAsync(async (req, res, next) => {
  // await contactServices.checkUserExistsById(req.params.id);
  const { contactId } = req.params;
  await contactServices.checkContactExistsById(contactId);

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
