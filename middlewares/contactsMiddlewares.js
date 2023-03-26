const { contactList } = require("../controllers");
const AppError = require("../utils/appError");
const { catchAsync, contactValidator } = require("../utils");
const Contact = require("../models/contactsModel");

// todo check the function, causes an error
const checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
});

const checkSameContact = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (
    (await Contact.exists({ name: name })) ||
    (await Contact.exists({ email: email })) ||
    (await Contact.exists({ phone: phone }))
  ) {
    return next(new AppError(400, "contact already exists"));
  }

  next();
});

const checkContactId = catchAsync(async (req, res, next) => {
  const id = req.params.contactId.toString();
  const contacts = await contactList();

  if (contacts.find((contact) => contact.id === id)) {
    next();
    return;
  }

  next(new AppError(404, "User with this id does not exist.."));
});

module.exports = {
  checkSameContact,
  checkContactId,
  checkCreateContactData,
};
