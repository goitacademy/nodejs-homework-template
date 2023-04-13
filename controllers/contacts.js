const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (_, res) => {
  const result = await contacts.listContacts();
  res.status(200).json({ status: "success", code: 200, data: result });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ status: "success", code: 200, data: result });
};

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  console.log("result:", result);

  res.status(201).json({ status: "success", code: 201, data: result });
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted", code: 200 });
};

const updateById = async (req, res) => {
  const data = req.body;

  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, data);
  res.status(200).json({
    status: "success",
    code: 200,
    data: result,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
