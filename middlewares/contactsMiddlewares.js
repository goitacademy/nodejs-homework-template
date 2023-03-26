const { contactList } = require("../controllers");
const AppError = require("../utils/appError");
const { sameContact, catchAsync } = require("../utils");

const checkCreateContactData = catchAsync((req, res, next) => {
  console.log("===========BEGIN=of=MIDDLEWARE========");
  // const { error, value } = contactValidator(req.body);
  // console.log("=========ERROR=======");
  // console.log(error);

  // if (error) return next(new AppError(400, error.details[0].message));

  // req.body = value;

  console.log("=========END=of=MIDDLEWARE=========");
  // console.log(value);

  next();
});

const checkSameContact = catchAsync(async (req, res, next) => {
  const contacts = await contactList();
  const contact = req.body;

  if (sameContact(contacts, contact)) {
    next(new AppError(400, "contact already exist"));
    return;
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
