const { HttpError } = require("../../helpers");
const ctrlWrapper = require("../../decorators");
const Contact = require("../../models/contact");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) throw HttpError(404, `Not found`);
  res.json(contact);
};

const updById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!contact) throw HttpError(404, `Not found`);
  res.json(contact);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) throw HttpError(404, `Not found`);
  res.json({ message: "contact deleted" });
};

const updStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!contact) throw HttpError(404, `Not found`);
  res.json(contact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  deleteById: ctrlWrapper(deleteById),
  updById: ctrlWrapper(updById),
  updStatusContact: ctrlWrapper(updStatusContact),
};
