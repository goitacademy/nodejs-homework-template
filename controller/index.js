const service = require("../service");

const { AppError, catchAsync, contactsValidators } = require("../utils");

const listContacts = catchAsync(async (req, res, next) => {
  const contacts = await service.getAllContacts();

  res.status(200).json({
    msg: "Success",
    contacts,
  });
});

const getContactById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const contact = await service.getContactById(id);

  if (!contact) throw new AppError(404, "Not found");

  res.status(200).json({
    msg: "Success",
    contact,
  });
});

const removeContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await service.removeContact(id);

  if (!result) {
    throw new AppError(404, "Not found");
  }
  res.status(200).json({
    msg: "contact deleted",
  });
});

const addContact = catchAsync(async (req, res, next) => {
  const { error, value } = contactsValidators.createContactDataValidator(
    req.body
  );

  if (error) throw new AppError(400, "missing required field");

  const newContact = await service.addContact(value);

  res.status(201).json({
    msg: "Success",
    contact: newContact,
  });
});

const updateContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { error, value } = contactsValidators.updateContactDataValidator(
    req.body
  );

  if (error) throw new AppError(400, "missing required fields");

  const updatedContact = await service.updateContact(id, value);

  res.status(200).json({
    msg: "Success",
    contact: updatedContact,
  });
});

const updateStatusContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { error, value } = contactsValidators.updateStatusContact(req.body);
  console.log("value", value);

  if (error) throw new AppError(400, "missing required fields");
  const updatedContactStatus = await service.updateContact(id, value);

  res.status(200).json({
    msg: "Success",
    contact: updatedContactStatus,
  });
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
