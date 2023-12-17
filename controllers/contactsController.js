const {
  listContacts,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const { catchAsync, userValidators } = require("../utils");

const getContacts = catchAsync(async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

const getContactById = (req, res) => {
  res.status(200).json(req.contact);
};

const createContact = catchAsync(async (req, res) => {
  const { value, error } = userValidators.createUserDataValidator(req.body);

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ message: errorMessage });
  }

  const newContact = await addContact(value);

  res.status(201).json(newContact);
});

const updateContactById = async (req, res) => {
  const { value } = userValidators.updateUserDataValidator(req.body);
  const { id } = req.params;

  if (!value || Object.keys(value).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const updateData = await updateContact(id, value);

  res.status(200).json(updateData);
};

const deleteContact = catchAsync(async (req, res) => {
  await removeContact(req.params.id);

  res.status(200).json({ message: "contact deleted" });
});

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContact,
};
