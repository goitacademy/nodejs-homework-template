const HttpError = require("../helpers/HttpError");
const cntrlWrapper = require("../decorators/cntrlWrapper");
const { Contact } = require("../schemas/contacts-schemas");

const listContacts = async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");

  if (!result) {
    res.status(500).json({
      message: "Server error",
    });
  }

  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);

  if (!result) next(error);

  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({ message: "deleted" });
};

const updateStatusContact = async (req, res) => {
  if (Object.entries(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(result);
};

module.exports = {
  listContacts: cntrlWrapper(listContacts),
  getContactById: cntrlWrapper(getContactById),
  addContact: cntrlWrapper(addContact),
  removeContact: cntrlWrapper(removeContact),
  updateContact: cntrlWrapper(updateContact),
  updateStatusContact: cntrlWrapper(updateStatusContact),
};
