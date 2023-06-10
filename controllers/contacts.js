const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { HttpError, cntrlWrapper } = require("../helpers/index");

const getAll = async (req, res) => {
  const result = await listContacts();

  res.status(200).json({
    result,
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    result,
  });
};

const add = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const results = await addContact(name, email, phone);

  res.status(201).json({
    results,
  });
};

const updateById = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;

  const result = await updateContact(contactId, body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactMatch = await getContactById(contactId);

  if (contactMatch === undefined) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  await removeContact(contactId);

  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll: cntrlWrapper(getAll),
  getById: cntrlWrapper(getById),
  add: cntrlWrapper(add),
  updateById: cntrlWrapper(updateById),
  deleteById: cntrlWrapper(deleteById),
};
