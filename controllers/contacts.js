const {
  Contact,
  validateSchema,
  updateFavoriteSchema,
} = require("../models/contact");

const  HttpError  = require("../utils/HttpError");
const ctrlWrapper = require("../utils/ctrlWrapper");

const getContactList = async (req, res) => {
  const contactList = await Contact.find();
  res.json(contactList);
};

const getOneContact = async (req, res) => {
  const { contactId } = req.params;

  const foundContact = await Contact.findById(contactId);

  if (!foundContact) {
    throw HttpError(404, "Contact not found");
  }

  res.json(foundContact);
};

const addNewContact = async (req, res) => {
  const body = req.body;

  const { error } = validateSchema.validate(body);
  if (error) {
    throw HttpError(400, error.message);
  }

  await Contact.create(body);

  res.status(201).json({
    message: `New contact '${body.name}' successfuly added to your contacts`,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const removedContact = await Contact.findByIdAndDelete(contactId);
  if (!removedContact) {
    throw HttpError(
      404,
      "Contact not found or already have been deleted, make sure the id is valid"
    );
  }

  res.json({
    message: `Delete contact success`,
  });
};

const updateContactById = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;

  const { error } = validateSchema.validate(body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Contact not found, make sure the id is valid");
  }

  res.json({
    message: `Contact: '${body.name}' successfuly updated`,
  });
};

const updateStatusContact = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;

  const { error } = updateFavoriteSchema.validate(body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, 'message": "missing field favorite');
  }

  res.json(result);
};

module.exports = {
  getContactList: ctrlWrapper(getContactList),
  getOneContact: ctrlWrapper(getOneContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
