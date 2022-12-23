const contacts = require('../service/index')
const { HttpError } = require("../HttpError");

const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };
  return func;
};

const getAllContacts = async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json({ data, status: 200 });
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacts.getContactById(contactId);
  if (!data) {
    throw HttpError(404);
  }
  res.json({ data, status: 200 });
};

const postContact = async (req, res, next) => {
  const result = await contacts.createContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const toggleContactFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  if (!req.body.favorite) {
    return res.json({"message": "missing field favorite", status: 400})
  }
  const result = await contacts.updateStatusContact(contactId, req.body.favorite);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const bool = await contacts.removeContact(contactId);
  if (bool === null) {
    res.json({ message: "Not found", status: 404 });
  } else {
    res.json({ message: "Contact deleted", status: 200 });
  }
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  postContact: ctrlWrapper(postContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
  toggleContactFavorite: ctrlWrapper(toggleContactFavorite),
};
