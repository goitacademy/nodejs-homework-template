const { HttpError, ctrlWrapper } = require("./../helpers/index");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./../models/contacts");

const { contactSchema } = require("./../validation/index");
const getAllContacts = async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    message: "ok",
    data: data,
  });
};

const getSingleContact = async (req, res, next) => {
  const id = req.params.contactId;
  const response = await getContactById(id);
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "ok",
    data: response,
  });
};

const addNewContact = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }
  const body = req.body;

  const { error } = contactSchema.validate(body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const response = await addContact(body);

  if (response === "contact already exists") {
    throw HttpError(
      409,
      "Contact with such name, email or phone already exists"
    );
  }

  res.status(201).json({
    status: "success",
    code: 201,
    message: "New contact created",
    data: response,
  });
};

const deleteContact = async (req, res, next) => {
  const response = await removeContact(req.params.contactId);
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: response,
  });
};

const setContact = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const response = await updateContact(req.params.contactId, req.body);

  if (!response) {
    throw HttpError(404, "Not found");
  }

  if (response === "contact already exists") {
    throw HttpError(
      409,
      "Contact with such name, email or phone already exists"
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact updated",
    data: response,
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getSingleContact: ctrlWrapper(getSingleContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  setContact: ctrlWrapper(setContact),
};
