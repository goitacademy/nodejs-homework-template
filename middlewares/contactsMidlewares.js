const { AppError, catchAsync, contactsValidators } = require("../utils");
const contactService = require("../services/contactServices");

/**
 * Check user exists in db by id middleware.
 */
exports.checkContactById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await contactService.contactExistsById(id);

  next();
});

exports.checkCreateContactById = catchAsync(async (req, res, next) => {
  const { error, value } = contactsValidators.createContactDataValidator(
    req.body
  );

  if (error) {
    console.log(error);

    throw new AppError(400, "Invalid contact data..");
  }

  await contactService.contactExists({ email: value.email });

  req.body = value;

  next();
});

exports.checkUpdateContactById = catchAsync(async (req, res, next) => {
  const { error, value } = contactsValidators.updateContactDataValidator(
    req.body
  );

  await contactService.contactExists({
    email: value.email,
    _id: { $ne: req.params.id },
  });

  if (error) {
    console.log(error);

    throw new AppError(400, "Invalid contact data..");
  }

  req.body = value;

  next();
});

exports.checkUpdateContactFavorite = catchAsync(async (req, res, next) => {
  const { error, value } = contactsValidators.updateContactDataValidator(
    req.body
  );

  await contactService.contactExists({
    email: value.email,
    _id: { $ne: req.params.id },
  });

  if (error) {
    console.log(error);

    throw new AppError(400, "Invalid contact data..");
  }

  req.body = value;

  next();
});
