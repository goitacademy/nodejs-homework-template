const fs = require("fs").promises;

const { AppError, catchAsync, contactsValidators } = require("../utils");
const Contact = require("../models/contactsModel");

/**
 * Check user exists in db by id middleware.
 */
exports.checkContactsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id.length < 10) throw new AppError(400, "Invalid ID..");

  const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

  const contact = contacts.find((item) => item.id === id);

  if (!contact) throw new AppError(400, "Contact does not exist..");

  req.contact = contact;

  next();
});

exports.checkCreateContactsById = catchAsync(async (req, res, next) => {
  const { error, value } = contactsValidators.createContactDataValidator(
    req.body
  );

  if (error) throw new AppError(400, "Invalid contact data..");

  const contactExisrs = await Contact.find({ email: value.email });
});
