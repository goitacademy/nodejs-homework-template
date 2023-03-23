const Contact = require("../models/contact.js");

const controllersWraper = require("../helpers/contollersWraper");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findOne({ _id: id });
  if (!contact) {
    return res.status(404).json({ message: "contact not found" });
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const body = req.body;

  const addedContact = await Contact.create(body);
  res.status(201).json(addedContact);
};

const removeById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  return result
    ? res.status(200).json({ message: " contact was deleted" })
    : res.status(404).json({ message: "contact not found" });
};

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  return result
    ? res.status(200).json(result)
    : res.status(404).json({ message: "contact not found" });
};

const updateFavorit = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  return result
    ? res.status(200).json(result)
    : res.status(404).json({ message: "contact not found" });
};

module.exports = {
  getAll: controllersWraper(getAll),
  getById: controllersWraper(getById),
  add: controllersWraper(add),
  removeById: controllersWraper(removeById),
  updateById: controllersWraper(updateById),
  updateFavorit: controllersWraper(updateFavorit),
};
