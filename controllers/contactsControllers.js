const { HttpError, ctrlWrapper } = require("../helpers");
const {
  addContact,
  deleteContact,
  updateContact,
  getAllContacts,
  getContactById,
} = require("../models/contactsOperation");

const getAll = async (req, res) => {
  const result = await getAllContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const result = await deleteContact(id);
  if (!result) {
    throw HttpError(404);
  }
  // res.status(204).send()
  res.json({
    message: "delete succes",
  });
};

const post = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  post: ctrlWrapper(post),
};
