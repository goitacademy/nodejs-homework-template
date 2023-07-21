const { catchAsync } = require("../utils");
const contactService = require("../services/contactServices");

/**
 * Create new contact controller
 */
exports.addContact = catchAsync(async (req, res) => {
  const newContact = await contactService.addContact(req.body);

  res.status(201).json({
    msg: "Contact created!",
    contact: newContact,
  });
});

/**
 * Find all contact controller
 */
exports.listContacts = catchAsync(async (req, res) => {
  const contacts = await contactService.listContacts();

  res.status(200).json({
    msg: "Success",
    contacts,
  });
});

/**
 * Find contact by id controller
 */
exports.getContactById = catchAsync(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);

  res.status(200).json({
    msg: "Success",
    contact,
  });
});

/**
 * Update contact controller
 */
exports.updateContact = catchAsync(async (req, res) => {
  const updateContact = await contactService.updateContact(
    req.params.id,
    req.body
  );

  res.status(200).json({
    msg: "Contact updated!",
    contact: updateContact,
  });
});

/**
 * Update Favorite controller
 */
exports.updateContactFavorite = catchAsync(async (req, res) => {
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updateContact = await contactService.updateContactFavorite(
    req.params.id,
    favorite
  );
  console.log(updateContact);

  res.status(200).json({
    msg: "Contact updated!",
    contact: updateContact,
  });
});

/**
 * Delete contact controller
 */
exports.removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await contactService.removeContact(id);

  res.sendStatus(204);
});
