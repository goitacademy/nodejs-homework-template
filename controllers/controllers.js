const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");
const { createNotFoundHttpError } = require("../helpers/index");

const getAll = async (req, res, next) => {
  const contatcs = await listContacts();
  res.json({ contatcs });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contactToShow = await getContactById(id);
  if (!contactToShow) {
    next(createNotFoundHttpError());
  }
  res.json({ contactToShow });
};

const create = async (req, res, next) => {
  const body = req.body;
  const newContact = await addContact(body);
  res.status(201).json({ newContact });
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const success = await removeContact(id);
  if (!success) {
    next(createNotFoundHttpError());
  }
  res.json({ message: "Contact deleted" });
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const updatedContact = await updateContact(id, body);
  if (!updatedContact) {
    next(createNotFoundHttpError());
  }
  res.json({ updatedContact });
};

const updateStatusById = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  const updatedStatusContact = await updateStatusContact(id, body);

  if (!updatedStatusContact) {
    next(createNotFoundHttpError());
  }
  res.json({ updatedStatusContact });
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
  updateStatusById,
};
